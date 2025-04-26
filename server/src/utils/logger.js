import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { env } from '../config/constants.js';

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

// Colors for console output
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
};

winston.addColors(colors);

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let log = {
    timestamp,
    level,
    message,
    ...metadata,
    service: env.SERVICE_NAME || 'auth-service',
    environment: env.NODE_ENV,
    pid: process.pid
  };

  if (stack) {
    log.stack = stack;
  }

  return JSON.stringify(log);
});

// Redact sensitive information
const redactKeys = ['password', 'token', 'authorization', 'creditCard'];
const redactFormat = winston.format((info) => {
  if (info.message) {
    redactKeys.forEach((key) => {
      if (info.message.includes(key)) {
        info.message = info.message.replace(
          new RegExp(`${key}=([^&]*)`), 
          `${key}=[REDACTED]`
        );
      }
    });
  }
  return info;
});

// Configure transports
const transports = [
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    level: 'error',
    format: combine(
      redactFormat(),
      logFormat
    )
  }),
  new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
    format: combine(
      redactFormat(),
      logFormat
    )
  })
];

if (env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: combine(
        colorize({ all: true }),
        printf(({ level, message, timestamp }) => {
          return `${timestamp} ${level}: ${message}`;
        })
      )
    })
  );
}

// Create logger instance
const logger = winston.createLogger({
  level: env.LOG_LEVEL || 'info',
  levels,
  format: combine(
    errors({ stack: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    logFormat
  ),
  transports,
  handleExceptions: true,
  handleRejections: true
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
  process.exit(1);
});

export default logger;
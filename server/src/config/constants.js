// config/constants.js
import Joi from 'joi';

// Environment variables validation schema
export const envSchema = Joi.object({
  // Core Configuration
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .required()
    .description('Application environment'),
  PORT: Joi.number()
    .port()
    .default(8000)
    .description('Server port number'),

  // Security Configuration
  JWT_SECRET: Joi.string()
    .min(64)
    .required()
    .description('JWT secret key'),
  JWT_ACCESS_EXPIRATION: Joi.string()
    .default('15m')
    .description('JWT access token expiration time'),
  JWT_REFRESH_EXPIRATION: Joi.string()
    .default('7d')
    .description('JWT refresh token expiration time'),

  // Database Configuration
  MONGODB_URI: Joi.string()
    .uri()
    .required()
    .description('MongoDB connection URI'),
  REDIS_URL: Joi.string()
    .uri()
    .required()
    .description('Redis connection URL'),

  // Rate Limiting
  RATE_LIMIT_WINDOW: Joi.number()
    .default(15)
    .description('Rate limiting window in minutes'),
  RATE_LIMIT_MAX_PROD: Joi.number()
    .default(100)
    .description('Max requests per window in production'),
  RATE_LIMIT_MAX_DEV: Joi.number()
    .default(1000)
    .description('Max requests per window in development'),

  // Optional Configuration
  CLIENT_URL: Joi.string()
    .uri()
    .default('http://localhost:3000')
    .description('Frontend client URL'),
  COOKIE_DOMAIN: Joi.string()
    .default('localhost')
    .description('Cookie domain configuration')
})
  .unknown(true) // Allow unknown environment variables
  .meta({ className: 'EnvironmentVariables' });

// HTTP Status Code Constants
export const HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
});

// Standard Error Messages
export const ErrorMessage = Object.freeze({
  DB_CONNECTION: 'Database connection error',
  UNAUTHENTICATED: 'Authentication required',
  UNAUTHORIZED: 'Insufficient permissions',
  INVALID_TOKEN: 'Invalid or expired token',
  RATE_LIMITED: 'Too many requests from this IP, please try again later',
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Resource not found',
  INTERNAL_ERROR: 'Internal server error'
});

// Usage in other files:
// import { envSchema, HttpStatus, ErrorMessage } from '../config/constants.js';
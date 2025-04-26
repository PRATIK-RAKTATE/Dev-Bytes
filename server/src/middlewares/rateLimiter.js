// middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redisClient from '../config/redis.js';
import { ApiError } from '../utils/ApiError.js';
import { ErrorMessage, HttpStatus } from '../config/constants.js';

// Global rate limiter for API endpoints
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' 
    ? parseInt(process.env.RATE_LIMIT_MAX_PROD) || 100
    : parseInt(process.env.RATE_LIMIT_MAX_DEV) || 1000,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:global:',
    expiry: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 || 900 // Match window in seconds
  }),
  handler: (req, res) => {
    throw new ApiError(HttpStatus.TOO_MANY_REQUESTS, ErrorMessage.RATE_LIMITED);
  },
  validate: {
    config: false, // Disable config validation in production
    requestCount: process.env.NODE_ENV !== 'production'
  }
});

// Strict limiter for sensitive endpoints (login, password reset)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 5 : 20,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:login:',
    expiry: 900
  }),
  handler: (req, res, next) => {
    res.setHeader('Retry-After', Math.ceil(this.windowMs / 1000));
    next(
      new ApiError(
        HttpStatus.TOO_MANY_REQUESTS,
        ErrorMessage.RATE_LIMITED,
        false,
        `Account temporarily locked. Try again in ${Math.ceil(this.windowMs / 1000 / 60)} minutes`
      )
    );
  },
  keyGenerator: (req) => {
    // Rate limit by IP + email for login attempts
    return `${req.ip}:${req.body.email?.toLowerCase()}`;
  }
});

// Admin API rate limiter (separate limits for elevated access)
const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100,
  store: new RedisStore({
    client: redisClient,
    prefix: 'rl:admin:',
    expiry: 3600
  }),
  skip: (req) => {
    // Bypass rate limit for certain roles
    return req.user?.role === 'super-admin';
  },
  validate: {
    trustProxy: process.env.NODE_ENV === 'production'
  }
});

// Dynamic rate limiter creator
const createRateLimiter = (options) => rateLimit({
  ...options,
  store: new RedisStore({
    client: redisClient,
    prefix: `rl:${options.prefix}:`,
    expiry: Math.ceil(options.windowMs / 1000)
  }),
  handler: (req, res) => {
    throw new ApiError(
      HttpStatus.TOO_MANY_REQUESTS,
      options.message || ErrorMessage.RATE_LIMITED
    );
  }
});

export { globalLimiter, loginLimiter, adminLimiter, createRateLimiter };
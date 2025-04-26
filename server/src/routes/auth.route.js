import express from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { loginLimiter } from '../middlewares/rateLimiter.js';
import { 
  register,
  login,
  logout,
  refreshTokens
} from '../controllers/auth.controller.js';

const router = express.Router();

// POST /api/v1/auth/register
router.post(
  '/register',
  asyncHandler(register)
);

// POST /api/v1/auth/login
router.post(
  '/login',
  loginLimiter, // Apply rate limiting
  asyncHandler(login)
);

// POST /api/v1/auth/logout
router.post(
  '/logout',
  asyncHandler(logout)
);

// POST /api/v1/auth/refresh-token
router.post(
  '/refresh-token',
  asyncHandler(refreshTokens)
);

export default router;
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { User } from '../models/user.model.js';
import { generateTokens, verifyToken } from '../services/token.service.js';
import { HttpStatus, ErrorMessage } from '../config/constants.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // Check existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(HttpStatus.CONFLICT, ErrorMessage.USER_EXISTS);
  }

  // Create user
  const user = await User.create({ 
    name, 
    email, 
    password,
    role
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Update refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set secure cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    domain: process.env.COOKIE_DOMAIN,
    maxAge: Number(process.env.JWT_REFRESH_EXPIRATION_MS)
  };

  return res
    .status(HttpStatus.CREATED)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(
      HttpStatus.CREATED,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken
      },
      'Registration successful'
    ));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user with password
  const user = await User.findOne({ email })
    .select('+password +refreshToken');
  
  if (!user) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessage.INVALID_CREDENTIALS);
  }

  // Verify password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessage.INVALID_CREDENTIALS);
  }

  // Generate new tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Update refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    domain: process.env.COOKIE_DOMAIN,
    maxAge: Number(process.env.JWT_REFRESH_EXPIRATION_MS)
  };

  return res
    .status(HttpStatus.OK)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(
      HttpStatus.OK,
      {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        accessToken
      },
      'Login successful'
    ));
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  // Clear cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    domain: process.env.COOKIE_DOMAIN
  };

  return res
    .status(HttpStatus.OK)
    .clearCookie('accessToken', cookieOptions)
    .clearCookie('refreshToken', cookieOptions)
    .json(new ApiResponse(HttpStatus.OK, {}, 'Logout successful'));
});

const refreshTokens = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!incomingRefreshToken) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessage.UNAUTHENTICATED);
  }

  // Verify token
  const decoded = verifyToken(incomingRefreshToken, 'REFRESH');
  const user = await User.findById(decoded.sub).select('+refreshToken');

  if (!user || user.refreshToken !== incomingRefreshToken) {
    throw new ApiError(HttpStatus.UNAUTHORIZED, ErrorMessage.INVALID_TOKEN);
  }

  // Generate new tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Update refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Set cookies
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    domain: process.env.COOKIE_DOMAIN,
    maxAge: Number(process.env.JWT_REFRESH_EXPIRATION_MS)
  };

  return res
    .status(HttpStatus.OK)
    .cookie('accessToken', accessToken, cookieOptions)
    .cookie('refreshToken', refreshToken, cookieOptions)
    .json(new ApiResponse(
      HttpStatus.OK,
      { accessToken },
      'Tokens refreshed successfully'
    ));
});

export { register, login, logout, refreshTokens };
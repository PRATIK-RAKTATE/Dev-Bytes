import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { verifyToken } from '../services/token.service.js';
import { User } from '../models/user.model.js'

const authenticate = asyncHandler(async (req, res, next) => {
    let token;
    if (req.cookie.accessToken) {
        token = req.cookie.accessToken;
    } else if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization?.split(' ')[1];
    }

    if (!token) throw new ApiError(401, 'Authentication required');

    const decoded = verifyToken(token, 'ACCESS');
    const user = await User.findById(decoded.sub).select('+refreshToken +passwordChangedAt');

    if (!user || user.changedPasswordAfter(decoded.iat)) {
        throw new ApiError(401, 'User not found or password changed');
    }

    req.user = user;
    next();
});

const authorize = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        throw new ApiError(403, 'Unauthorized access');
    }
    next();
};

export { authenticate, authorize };
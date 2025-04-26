import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

const tokenTypes = {
    ACCESS: 'ACCESS',
    REFRESS: 'REFRESS'
};

const generateTokens = (userId) => {
    const accesToken = jwt.sign(
        {
            sub: userId,
            type: tokenTypes.ACCESS
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION
        }
    );

    const refreshToken = jwt.sign(
        {
            sub: userId,
            type: tokenTypes.REFRESS
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION
        }
    );

    return { accesToken, refreshToken };
}

const verityToken = (token, exprectedType) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.type !== exprectedType) {
            throw new Error('Invalid token type');
        }

        return decoded;
    } catch (error) {
        throw new ApiError(401, 'Invalid or expired token');
    }
};

export { generateTokens, verityToken };
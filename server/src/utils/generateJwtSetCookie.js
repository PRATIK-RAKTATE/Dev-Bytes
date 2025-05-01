import jwt from 'jsonwebtoken';

export const generateJwtAndSetCookie =  (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECREATE, {
        expiresIn: '7d'
    })

    res.cookie('token', token, {
        httpOnly: true, // can't accessible via js (client side) // XSS not possible
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 17 * 60 * 60 * 1000,

    });

    return token
};

export default generateJwtAndSetCookie;
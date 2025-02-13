import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (payload: object, expiresIn: string = '7d'): string => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn });
};

export const verifyToken = (token: string): object | null => {
    try {
        return jwt.verify(token, SECRET_KEY) as object;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

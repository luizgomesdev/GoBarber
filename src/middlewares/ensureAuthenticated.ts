import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

const ensureAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction,
): void => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    const [_, token] = authHeader.split('Bearer ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch (error) {
        throw new Error('Invalid JWT Token');
    }
};

export default ensureAuthenticated;

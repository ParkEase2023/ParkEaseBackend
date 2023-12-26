import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';

interface DecodedToken {
    uid: string;
}

export const authentication = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    // console.log('res 10', req.headers);
    const token = String(authorization).split('Bearer ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        if (decoded.uid) {
            console.log('decoded', decoded);
            req.session.uid = decoded.uid;
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        console.log('error', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};

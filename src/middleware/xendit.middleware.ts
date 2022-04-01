import  { Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
dotenv.config();

const token = process.env.TOKEN_CALLBACK ||  'secret';

export const isXendit = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers;
    if (header['x-callback-token'] === token) {
        return next();
    }
    return res.status(403).json({ error: 'You are not xendit callback' });
};
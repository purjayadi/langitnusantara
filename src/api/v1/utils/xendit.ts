import  { Request, Response, NextFunction} from 'express';
import Logger from './logger';

export const isXendit = (req: Request, res: Response, next: NextFunction) => {
    req.headers;
    if (!req) return res.status(403).json({
        success: false,
        message: 'You are not xendit callback'
    });
    const user = req.user;
    Logger.debug(user);
    //@ts-ignore
    if (!user.isAdmin) return res.status(403).json({
        success: false,
        message: 'You are not an admin'
    });
    next();
};
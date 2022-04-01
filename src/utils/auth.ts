import  { Request, Response, NextFunction} from 'express';
import Logger from './logger';
import passport from 'passport';

export const auth = passport.authenticate('jwt', { session: false });

export const isTraveller = (req: Request, res: Response, next: NextFunction) => {
    Logger.debug(req.user);
    if (!req.user) return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this resource'
    });
    const user = req.user;
    Logger.debug(user);
    //@ts-ignore
    if (!user.isAdmin) return res.status(401).json({
        success: false,
        message: 'You are not a traveller'
    });
    next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({
        success: false,
        message: 'You are not authorized to access this resource'
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
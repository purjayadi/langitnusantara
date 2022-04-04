import { Request, Response, NextFunction, Router } from 'express';
import { IUser } from 'src/interfaces';
import passport from '../middleware/passport.middleware';
import { UserService } from '../services';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/passport';
import Logger from '../utils/logger';
import { auth, isAdmin } from '../utils/auth';

const AuthApi = Router();
const service = new UserService();
//route register
AuthApi.post('/register', async (req: Request, res: Response) => {
    const user: IUser = req.body;
    try {
        await service.CreateUser(user);
        return res.status(200).json({
            success: true,
            message: 'Register successfully',
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

AuthApi.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (!user) return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
        req.logIn(user, (err) => {
            if (err) throw err;
            const accessToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1h' });
            const refreshToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1d' });
            return res.status(200).json({
                success: true,
                message: 'Login successfully',
                accessToken: accessToken,
                refreshToken: refreshToken
            });
        });
    })(req, res, next);
});

AuthApi.post('/logout', auth, async (req: Request, res: Response) => {
    req.logOut();
    return res.status(204).json({
        success: true,
        message: 'Logout successfully',
    });
});

AuthApi.get('/me', auth, async (req: Request, res: Response) => {
    Logger.info(req.user);
    return res.status(200).json({
        success: true,
        message: 'Get user successfully',
        user: req.user
    });
});

AuthApi.get('/test', auth, isAdmin, async (req: Request, res: Response) => {
    // isTraveller(req, res, next);
    return res.status(200).json({
        success: true,
        message: 'Get user successfully',
        user: req.user
    });
});


// eslint-disable-next-line no-unused-vars
AuthApi.get('/facebook', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('facebook', (err, user) => {
        if (err) throw err;
        return user;
    });
});

AuthApi.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

AuthApi.get('/google/callback',
    async(req: Request, res: Response, next: NextFunction) =>{
        passport.authenticate('google', { session: false }, (err, user) => {
            if (err) throw err;
            return user;
        })(req, res, next);
    });

export default AuthApi;
import { Request, Response, NextFunction, Router } from 'express';
import { IUser } from '../interfaces';
import passport from '../middleware/passport.middleware';
import { UserService } from '../services';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/passport';
import Logger from '../utils/logger';
import { auth, isAdmin } from '../utils/auth';

const AuthController = Router();
const service = new UserService();
//route register
AuthController.post('/register', async (req: Request, res: Response) => {
    const user: IUser = req.body;
    Logger.debug(user);
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

AuthController.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        Logger.debug(user);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        req.logIn(user, (err) => {
            if (err) throw err;
            const accessToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1d' });
            return res.status(200).json({
                success: true,
                message: 'Login successfully',
                accessToken: accessToken,
                user: user
            });
        });
    })(req, res, next);
});

AuthController.post('/logout', auth, async (req: Request, res: Response) => {
    req.logOut();
    return res.status(204).json({
        success: true,
        message: 'Logout successfully',
    });
});

AuthController.get('/me', auth, async (req: Request, res: Response) => {
    Logger.info(req.user);
    return res.status(200).json({
        success: true,
        message: 'Get user successfully',
        user: req.user
    });
});

AuthController.get('/test', auth, isAdmin, async (req: Request, res: Response) => {
    // isTraveller(req, res, next);
    Logger.info(req);
    const user = req.user;
    const accessToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.status(200).json({
        success: true,
        message: 'Login successfully',
        accessToken: accessToken
    });
});


// eslint-disable-next-line no-unused-vars
AuthController.get('/facebook', async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('facebook', (err, user) => {
        if (err) throw err;
        return user;
    });
});

AuthController.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email']} )
);

AuthController.get('/callback/google',
    passport.authenticate('google', { failureRedirect: '/api/v1/auth/google/failure' }),
    async (req: Request, res: Response) => {
        const user = req.user;
        const accessToken = jwt.sign({ user }, JWT_SECRET || 'secret', { expiresIn: '1h' });
        return res.status(200).json({
            success: true,
            message: 'Login successfully',
            accessToken: accessToken,
            user: user
        });
    }
);

AuthController.get('/google/failure', (req: Request, res: Response) => {
    return res.status(500).json({
        success: false,
        message: 'Login failed, please try again',
    });
});

export default AuthController;
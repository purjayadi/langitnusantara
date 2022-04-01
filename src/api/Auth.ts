import { Request, Response, NextFunction } from 'express';
import { IUser } from 'src/interfaces';
import passport from '../middleware/passport.middleware';
import { UserService } from '../services';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/passport';
import Logger from '../utils/logger';
import { auth, isAdmin } from '../utils/auth';

export = (app: any) => {
    const service = new UserService();
    //route register
    app.post('/auth/register', async (req: Request, res: Response) => {
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

    app.post('/auth/login', async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local' , {session: false}, (err, user) => {
            if (!user) return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
            req.logIn(user, (err) => {
                if (err) throw err;
                const token = jwt.sign({user}, JWT_SECRET || '7C282E899FA4A9D9',    {expiresIn: '7d'});
                return res.status(200).json({
                    success: true,
                    message: 'Login successfully',
                    token: token
                });
            });
        })(req, res, next);
    });

    app.post('/auth/logout', auth, async (req: Request, res: Response) => {
        req.logOut();
        return res.status(204).json({
            success: true,
            message: 'Logout successfully',
        });
    });

    app.get('/auth/me', auth, async (req: Request, res: Response) => {
        Logger.info(req.user);
        return res.status(200).json({
            success: true,
            message: 'Get user successfully',
            user: req.user
        });
    });

    app.get('/auth/test', auth, isAdmin, async (req: Request, res: Response) => {
        // isTraveller(req, res, next);
        return res.status(200).json({
            success: true,
            message: 'Get user successfully',
            user: req.user
        });
    });

    
    // eslint-disable-next-line no-unused-vars
    app.get('/auth/facebook', async (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('facebook', (err, user) => {
            if (err) throw err;
            return user;
        });
    });
};
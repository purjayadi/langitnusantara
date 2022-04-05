import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../database/models/user';
import { UserInput } from 'src/interfaces';
import Logger from '../utils/logger';
import { Op } from 'sequelize';
require('dotenv').config();

passport.use(
    'local',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        async (email, password, done) => {
            const user = await User.findOne({ where: { email: email }, });
            //@ts-ignore
            if (user && (user.comparePassword(password, done))) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    ));

passport.use(
    'jwt',
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env['JWT_SECRET'] || 'secret',
            algorithms: ['HS256'],
        },
        async (jwtPayload, done) => {
            const user = await User.scope('withoutPassword').findOne({ where: { email: jwtPayload.user.email } });
            //@ts-ignore
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        }
    )
);

passport.use(
    'google',
    new GoogleStrategy({
        clientID: process.env['clientID'] || 'clientID',
        clientSecret: process.env['clientSecret'] || 'clientSecret',
        callbackURL: process.env['callbackURL'] || 'clientSecret',
        passReqToCallback: true
    },
        // @ts-ignore
        async function (accessToken, refreshToken, profile, cb, done) {
            Logger.debug(cb);
            const payload: UserInput = {
                firstName: cb.given_name as string,
                lastName: cb.family_name as string,
                email: cb.email as string,
                provider: cb.provider as string
            };
            const user = await User.findOne({ where: { 
                [Op.and]: [{ email: payload.email }, { provider: payload.provider }]
             }});
            if (!user) {
                await User.create(payload)
                    .then(user => {
                        done(null, user);
                    })
                    .catch(err => {
                        done(err);
                    });
            } else {
                done(null, user);
            }
        }

    ));


passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (req: Request, id: string, done: any) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
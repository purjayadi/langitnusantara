import { Request } from 'express';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../database/models/user';
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
        const user  = await User.scope('withoutPassword').findOne({ where: { email: jwtPayload.user.email }});
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
    'facebook',
    new FacebookStrategy(
        {
            clientID: process.env['FACEBOOK_CLIENT_ID'] || 'clientID',
            clientSecret: process.env['FACEBOOK_CLIENT_SECRET'] || 'clientSecret',
            callbackURL: process.env['FACEBOOK_CALLBACK_URL'] || 'callbackURL',
            profileFields: ['id', 'displayName', 'email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            // const user = await User.findOrCreate({ where: { email: email }, });
            //@ts-ignore
            return done(null, profile);
        }
));


passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (req: Request, id: string, done:any) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

export default passport;
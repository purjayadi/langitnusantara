import pg from 'pg';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
require('dotenv').config();

const pgPool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
});

const sessionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  return session({
    store: new (require('connect-pg-simple')(session))({
        pool : pgPool,
        tableName : 'Sessions'
    }),
    secret: '7C282E899FA4A9D9',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } // 30 days
  })(req, res, next);
};

export default sessionMiddleware;
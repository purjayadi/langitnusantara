import express from 'express';
import cors from 'cors';
import db from './config/db';
import passport from './api/v1/middleware/passport.middleware';
import Logger from './api/v1/utils/logger';
import morganMiddleware from './api/v1/middleware/morganMiddleware';
import routers from './api/v1/routes';
// import sessionMiddleware from './middlewares/session.middlware';

const PORT : string|number = process.env.PORT || 3001;

const app = express();
app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})
);
app.use(morganMiddleware);
app.use(cors());
// app.use(sessionMiddleware);
app.use(passport.initialize());
// app.use(passport.session());

app.use(express.static('public')); 
db.authenticate()
  .then(() => {
    Logger.info('Database connected.');
  })
  .catch((err) => {
    Logger.error('ERROR - Unable to connect to the database:', err);
  });

app.use('/api/v1', routers);

app.listen(PORT, () => {
  Logger.info('App is listening on port 3000!');
});

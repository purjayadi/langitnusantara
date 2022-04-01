import express from 'express';
import db from '../config/db';
import cors from 'cors';
import passport from './middleware/passport.middleware';
import { Category, Gallery, Hotel, Service, Profile, Package, Feature, Partner, Review, Team, Order, User, Auth, Va, Event, PaymentChanel, Test  } from './api';
import Logger from './utils/logger';
import morganMiddleware from './middleware/morganMiddleware';
// import sessionMiddleware from './middlewares/session.middlware';


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


// Routes
Category(app);
Gallery(app);
Service(app);
Hotel(app);
Profile(app);
Package(app);
Feature(app);
Partner(app);
Review(app);
Team(app);
Order(app);
User(app);
Auth(app);
Va(app);
Event(app);
PaymentChanel(app);
Test(app);

app.listen(3000, () => {
  Logger.info('App is listening on port 3000!');
});

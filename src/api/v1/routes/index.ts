import { Router } from 'express';
import { Gallery, Category, Auth, Feature, Hotel, Order, Package, Partner, Profile, Review, Service, Team, User, Event, PaymentChanel, Test, Destination } from '../controllers';

const routers = Router();
routers.use('/category', Category);
routers.use('/feature', Feature);
routers.use('/gallery', Gallery);
routers.use('/hotel', Hotel);
routers.use('/order', Order);
routers.use('/package', Package);
routers.use('/partner', Partner);
routers.use('/profile', Profile);
routers.use('/review', Review);
routers.use('/service', Service);
routers.use('/team', Team);
routers.use('/user', User);
routers.use('/event', Event);
routers.use('/payment-chanel', PaymentChanel);
routers.use('/auth', Auth);
routers.use('/destination', Destination);
// router for test
routers.use('/test', Test);

export default routers;
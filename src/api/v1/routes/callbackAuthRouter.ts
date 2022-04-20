import { Router } from 'express';
import { Auth } from '../controllers';

const authRoute = Router();
authRoute.use('/auth', Auth);
export default authRoute;
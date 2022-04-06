require('dotenv').config();

export const JWT_SECRET = process.env['JWT_SECRET'];
export const clientID =  process.env['FACEBOOK_CLIENT_ID'];
export const clientSecret =  process.env['FACEBOOK_CLIENT_SECRET'];
export const callbackURL =  process.env['FACEBOOK_CALLBACK_URL'];
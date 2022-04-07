import axios from 'axios';
require('dotenv').config();

const instance = axios.create({
    baseURL: 'https://api.xendit.co'
});
  
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = 'Basic '+ Buffer.from(process.env.SECRET_KEY+':' || 'secret').toString('base64');

export default instance;
import dotenv from 'dotenv';
import Xendit from 'xendit-node';

dotenv.config();

const x = new Xendit({
  secretKey: process.env.SECRET_KEY || 'secretKey'
});

export default x;
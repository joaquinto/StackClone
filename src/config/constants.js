import dotenv from 'dotenv';

dotenv.config();

const {
  PORT, MONGODB_URI, SALT_ROUND, REDIS_URL, SECRET_KEY,
} = process.env;
const EXPIRATION_DURATION = '1d';

export default {
  PORT,
  MONGODB_URI,
  REDIS_URL,
  SALT_ROUND,
  SECRET_KEY,
  EXPIRATION_DURATION,
};

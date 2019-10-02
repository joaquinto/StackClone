import dotenv from 'dotenv';

dotenv.config();

const { PORT, DATABASE_URL } = process.env;

export default {
  PORT,
  DATABASE_URL,
};

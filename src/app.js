import express from 'express';
import morgan from 'morgan';
import log from 'fancy-log';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import mongoose from 'mongoose';

import constants from './config/constants';

const app = express();

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

// connect to mongodb database
mongoose.connect(constants.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// use middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to stackoverflow' });
});

// catch error 404 and then send it to the event handler
app.use((req, res, next) => {
  const err = new Error('Resource does not exist');
  err.status = 404;
  next(err);
});

// use this event handler when it is not running in production environment
if (!isProduction) {
  app.use((err, req, res, next) => {
    log(err.stack);
    res.status(err.status || 500).json({
      error: {
        message: err.message,
        error: err,
      },
      status: false,
    });
  });
}

app.use((err, req, res, next) => res.status(err.status || 500).json({
  error: {
    message: err.message,
    error: {},
  },
  status: false,
}));

export default app;

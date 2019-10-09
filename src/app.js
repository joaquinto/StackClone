import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import dbConnection from './database/migration/dbConnection';
import apiRouter from './routes';

const app = express();
dotenv.config();

// connect to mongodb database
dbConnection();

// use middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(apiRouter);

export default app;

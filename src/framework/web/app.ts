import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from '../router/index';
import dotenv from 'dotenv';
import corsOptions from '../../config/cors.config';
import errorHandler from '../../adapter/middleware/error_handle.middleware';

dotenv.config();
const createApp = (): Application => {
  const app = express();

  app.use(morgan('tiny'));
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use('/', router);

  app.use(errorHandler);

  return app;
};

export default createApp;
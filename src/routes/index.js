import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger/swagger';
import userRoute from './api/userRoute';
import authRoute from './api/authRoute';
import questionRoute from './api/questionRoute';
import answerRoute from './api/answerRoute';
import { respondWithWarning } from '../helpers/responseHandler';
import { findAnswers } from '../controllers/answerController';

const apiRouter = Router();
const apiUrl = '/api/v1';

apiRouter.get('/api/v1/answers', findAnswers);

apiRouter.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to stackoverflow' });
});

apiRouter.use(`${apiUrl}/auth`, authRoute);

apiRouter.use(`${apiUrl}/users`, userRoute);

apiRouter.use(`${apiUrl}/questions`, questionRoute);

apiRouter.use(`${apiUrl}/questions`, answerRoute);

apiRouter.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

apiRouter.all('*', (req, res) => respondWithWarning(res, 404, 'Page not found'));

export default apiRouter;

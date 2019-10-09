import { Router } from 'express';
import authenticateUserToken from '../../middlewares/authentication';
import answerController from '../../controllers/answerController';
import { checkUser } from '../../middlewares/userAuthentication';
import { answerValidation } from '../../middlewares/validation';
import validQuestion from '../../middlewares/questionAuthentication';

const answerRouter = Router();

answerRouter.post('/:questionId/answers', authenticateUserToken, checkUser, answerValidation, validQuestion, answerController);

export default answerRouter;

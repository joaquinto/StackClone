import { Router } from 'express';
import authenticateUserToken from '../../middlewares/authentication';
import { questionValidation, idValidation, questionSearchValidation } from '../../middlewares/validation';
import { checkUser } from '../../middlewares/userAuthentication';
import validQuestion from '../../middlewares/questionAuthentication';
import {
  postQuestion, getQuestions, getQuestion, upVoteAQuestion, downVoteAQuestion, queryQuestions,
} from '../../controllers/questionController';

const router = Router();

router.post('/', authenticateUserToken, checkUser, questionValidation, postQuestion);

router.get('/search', questionSearchValidation, queryQuestions);

router.get('/', getQuestions);

router.get('/:questionId', idValidation, validQuestion, getQuestion);

router.patch('/:questionId/upvote', authenticateUserToken, checkUser, idValidation, validQuestion, upVoteAQuestion);

router.patch('/:questionId/downvote', authenticateUserToken, checkUser, idValidation, validQuestion, downVoteAQuestion);

export default router;

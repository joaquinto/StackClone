import { Router } from 'express';
import { findUsers, queryUsers, subscribeToQuestion } from '../../controllers/userController';
import { userSearchValidation } from '../../middlewares/validation';
import authenticateUserToken from '../../middlewares/authentication';
import { checkUser } from '../../middlewares/userAuthentication';

const userRouter = Router();

userRouter.get('/', findUsers);

userRouter.patch('/subscribe', authenticateUserToken, checkUser, subscribeToQuestion);

userRouter.get('/search', userSearchValidation, queryUsers);

export default userRouter;

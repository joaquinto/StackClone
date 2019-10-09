import { Router } from 'express';
import { signUp, signIn } from '../../controllers/authController';
import { signUpValidation, signInValidation } from '../../middlewares/validation';
import { validUser, existingUser } from '../../middlewares/userAuthentication';

const authRouter = Router();

authRouter.post('/signup', signUpValidation, existingUser, signUp);

authRouter.post('/signin', signInValidation, validUser, signIn);

export default authRouter;

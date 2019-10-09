import { Router } from 'express';
import findUsers from '../../controllers/userController';

const router = Router();

router.get('/', findUsers);

export default router;

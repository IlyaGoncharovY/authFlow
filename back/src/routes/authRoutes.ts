import { Router } from 'express';

import {loginLocal, loginCookie, refreshToken, registerUser} from '../controllers';

const router = Router();

router.post('/login-local', loginLocal);
router.post('/login-cookie', loginCookie);
router.post('/refresh', refreshToken);
router.post('/register', registerUser);

export default router;

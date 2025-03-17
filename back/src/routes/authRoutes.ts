import { Router } from 'express';

import { loginLocal, loginCookie, refreshToken } from '../controllers/auth/authController';

const router = Router();

router.post('/login-local', loginLocal);
router.post('/login-cookie', loginCookie);
router.post('/refresh', refreshToken);

export default router;

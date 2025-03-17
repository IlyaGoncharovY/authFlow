import { Router } from 'express';

import { loginLocal, loginCookie, refreshToken } from '../controllers';

const router = Router();

router.post('/login-local', loginLocal);
router.post('/login-cookie', loginCookie);
router.post('/refresh', refreshToken);

export default router;

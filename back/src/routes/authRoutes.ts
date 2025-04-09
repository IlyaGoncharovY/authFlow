import {Router} from 'express';

import {loginUser, logout, refreshToken, registerUser} from '@/controllers';

const router = Router();

router.post('/login-local', loginUser({ useCookie: false }));
router.post('/login-cookie', loginUser({ useCookie: true }));
router.post('/register', registerUser);
router.post('/refresh', refreshToken);
router.post('/logout', logout);

export default router;

import {useNavigate} from 'react-router-dom';

import {LoginForm} from '../../features/login/ui/loginForm/LoginForm.tsx';
import {RegisterForm} from '../../features/login/ui/registerForm/RegisterForm.tsx';

import {useAppSelector} from '@/store/hooks/hook.ts';

export const LoginPage = () => {
  const isAuth = useAppSelector(state => state.auth.isAuth);

  const navigate = useNavigate();

  if (isAuth) navigate('/');

  return (
    <div>
      <p>LoginPage</p>
      <RegisterForm/>
      <LoginForm/>
    </div>
  );
};

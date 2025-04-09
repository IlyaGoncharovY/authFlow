import {selectModeLSOrCookieType} from 'shared/types';

import {loginUser} from '../../model/thunk/loginUser.ts';

import {useAppDispatch} from '@/store/hooks/hook.ts';
import {AuthForm} from '@/shared/components/form/FormLogin.tsx';

export const LoginForm = () => {
  const dispatch = useAppDispatch();

  const handleLogin = (username: string, password: string, mode: selectModeLSOrCookieType) => {
    dispatch(loginUser(username, password, mode));
  };

  return <AuthForm onSubmit={handleLogin} buttonLabel="Войти" showModeToggle />;
};

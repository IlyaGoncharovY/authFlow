import {useAppDispatch} from '@/store/hooks/hook.ts';
import {AuthForm} from '@/shared/components';
import {registerUser} from '@/features/login/model/thunk/registerUser.ts';

export const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const handleRegister = (username: string, password: string) => {
    dispatch(registerUser(username, password));
  };

  return <AuthForm onSubmit={handleRegister} buttonLabel="Зарегистрироваться" />;
};

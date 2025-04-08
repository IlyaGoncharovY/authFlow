import {ChangeEvent, FormEvent, useState} from 'react';

import {loginUser} from '../../model/thunk/loginUser.ts';

import {useAppDispatch} from '@/store/hooks/hook.ts';
import {FormLogin} from '@/shared/components/form/FormLogin.tsx';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault();
    dispatch(loginUser( username, password));
  };

  const onChangeSetUserNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  };

  const onChangeSetPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  return (
    <>
      <FormLogin
        handleRegister={handleSubmit}
        placeHolderUserNameInput={'Имя пользователя'}
        username={username}
        onChangeSetUserNameHandler={onChangeSetUserNameHandler}
        placeHolderPasswordInput={'Пароль'}
        password={password}
        onChangeSetPasswordHandler={onChangeSetPasswordHandler}
        submitButtonTitle={'Войти'}
      />
    </>
  );
};

import {ChangeEvent, FC, FormEvent, useState} from 'react';

import s from './FormLogin.module.css';

interface IFormLogin {
    handleRegister: (e: FormEvent) => Promise<void>
    username: string
    onChangeSetUserNameHandler: (e: ChangeEvent<HTMLInputElement>) => void
    placeHolderUserNameInput: string
    password: string
    onChangeSetPasswordHandler: (e: ChangeEvent<HTMLInputElement>) => void
    placeHolderPasswordInput: string
    submitButtonTitle: string
}

export const FormLogin:FC<IFormLogin> = ({
  handleRegister,
  username,
  onChangeSetUserNameHandler,
  password,
  placeHolderUserNameInput,
  onChangeSetPasswordHandler,
  submitButtonTitle,
}) => {
  const [mode, setMode] = useState<'local' | 'cookie'>('local');

  const onChangeSetModeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setMode(e.currentTarget.value as 'local' | 'cookie');
  };

  return (
    <div className={s.loginFormContainer}>
      <form onSubmit={handleRegister}>
        <input
          value={username}
          onChange={onChangeSetUserNameHandler}
          placeholder={placeHolderUserNameInput}
        />
        <input
          type="password"
          value={password}
          onChange={onChangeSetPasswordHandler}
          placeholder={placeHolderUserNameInput}/>
        <select value={mode} onChange={onChangeSetModeHandler}>
          <option value="local">localStorage</option>
          <option value="cookie">Cookie</option>
        </select>
        <button type="submit">{submitButtonTitle}</button>
      </form>
    </div>
  );
};

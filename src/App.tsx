import React, { ChangeEvent, useState } from 'react';

import { Input } from './components/Input/Input';

type Params = {
  name: string;
  email: string;
  password: string;
};

type ObjectResponseType = {
  status: 'error';
  errors: { field: 'name' | 'email' | 'password'; message: string }[];
};

export const register = (params: Params) =>
  new Promise((resolve, reject) => {
    setTimeout(
      () =>
        reject(
          new Error(
            JSON.stringify({
              status: 'error',
              errors: [
                { field: 'name', message: 'Неправильно указано имя' },
                { field: 'email', message: 'Такой email уже зарегистрирован' },
                { field: 'password', message: 'Пароль слишком короткий' },
                { field: 'password', message: 'Пароль должен содержать цифры' },
              ],
            }),
          ),
        ),
      3000,
    );
  });

export function App() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [errorName, setErrorName] = useState<string[]>([]);
  const [errorEmail, setErrorEmail] = useState<string[]>([]);
  const [errorPassword, setErrorPassword] = useState<string[]>([]);

  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const nameChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setName(value.currentTarget.value);
  };

  const emailChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setEmail(value.currentTarget.value);
  };

  const passwordChangeHandler = (value: ChangeEvent<HTMLInputElement>) => {
    setPassword(value.currentTarget.value);
  };

  function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault();
    setDisabledButton(true);
    register({ name, email, password }).catch((r) => {
      setDisabledButton(false);
      let objectResponse: ObjectResponseType = JSON.parse(r.message);
      if (objectResponse.status === 'error') {
        objectResponse.errors.forEach((item) => {
          if (item.field === 'name') {
            setErrorName([...errorName, item.message]);
          }
          if (item.field === 'email') {
            setErrorEmail([...errorEmail, item.message]);
          }
          if (item.field === 'password') {
            setErrorPassword([...errorPassword, item.message]);
          }
        });
      }
    });
  }
  console.log(errorPassword);

  return (
    <>
      <form className={'form'} onSubmit={sendForm}>
        <ul className="form__items">
          <li className="form__item">
            <Input
              value={name}
              type={'text'}
              onChange={nameChangeHandler}
              inputLabel={'Name'}
              errorText={errorName}
            />
          </li>
          <li className="form__item">
            <Input
              value={email}
              type={'email'}
              onChange={emailChangeHandler}
              inputLabel={'Email'}
              errorText={errorEmail}
            />
          </li>
          <li className="form__item">
            <Input
              value={password}
              type={'password'}
              onChange={passwordChangeHandler}
              inputLabel={'Password'}
              errorText={errorPassword}
            />
          </li>
          <li className="form__item">
            <Input type={'submit'} disabled={disabledButton} value={'Зарегистрироваться'} />
          </li>
        </ul>
      </form>
    </>
  );
}

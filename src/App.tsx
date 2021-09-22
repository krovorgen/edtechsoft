import React, { useState } from 'react';

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

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  function sendForm(e: { preventDefault: () => void }) {
    e.preventDefault();
    setDisabledButton(true);
    register({ name, email, password }).catch((r) => {
      let objectResponse: ObjectResponseType = JSON.parse(r.message);
      if (objectResponse.status === 'error') {
        setErrors(
          objectResponse.errors.reduce((acc, item) => {
            acc[item.field] = [...(acc[item.field] || []), item.message];
            return acc;
          }, {} as Record<string, string[]>)
        );
      }
    }).finally(() => setDisabledButton(false));
  }

  return (
    <>
      <form className={'form'} onSubmit={sendForm}>
        <ul className="form__items">
          <li className="form__item">
            <Input
              value={name}
              type={'text'}
              onChange={setName}
              inputLabel="Name"
              errorText={errors.name}
            />
          </li>
          <li className="form__item">
            <Input
              value={email}
              type={'email'}
              onChange={setEmail}
              inputLabel="Email"
              errorText={errors.email}
            />
          </li>
          <li className="form__item">
            <Input
              value={password}
              type={'password'}
              onChange={setPassword}
              inputLabel="Password"
              errorText={errors.password}
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

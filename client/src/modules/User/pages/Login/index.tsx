import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import styles from '../../styles.module.scss';
import cx from 'classnames';
import { RouteComponentProps } from 'react-router-dom';

import { TextField, Button, Form } from 'modules/Form';
import { ILoginUser } from 'modules/User/models';
import Error from 'modules/App/components/Error';
import Logo from 'modules/App/components/Logo';
import { setToken, translateMessages } from 'utils';
import useRequestApi, { IRequestData } from 'utils/http';

interface ILoginResponse extends IRequestData {
  data: {
    success: string;
    tokenData:
      | {
          token: any;
          expirationDate: string;
        }
      | any;
  };
  errors: string;
}

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(undefined as undefined | string);
  const { register, handleSubmit, errors } = useForm<ILoginUser>();

  const {
    called,
    loading: loadingRequest,
    requestApi,
    data,
    errors: errorsRequest,
  } = useRequestApi() as ILoginResponse;

  useEffect(() => {
    if (data && data.success) {
      setToken(data.tokenData);
      history.push('/');
    } else {
      const err =
        errorsRequest === 'User not found' || 'Data are incorrect'
          ? translateMessages(errorsRequest)
          : 'Nie udało się zalogować';
      if (called) setErrorMessage(err);
    }
  }, [data, errorsRequest]);

  const onSubmit = ({ userName, password }: ILoginUser) => {
    requestApi('api/user/login', 'POST', undefined, {
      disableJwtAuth: true,
      Authorization: `Basic ${btoa(`${userName}:${password}`)}`,
    });
  };

  return (
    <>
      {/* <Logo /> */}
      <div className={styles.wrapper}>
        <Form onSubmit={handleSubmit(onSubmit as any)}>
          <h1 className={cx(styles.header, 'subtitle is-2')}>Logowanie</h1>
          <TextField
            name="userName"
            register={register({
              required: true,
              maxLength: 255,
              minLength: 5,
            })}
            type="text"
            label="Login"
            placeholder="Login"
            icon="user"
            errors={errors}
            onChange={() => setErrorMessage(undefined)}
          />
          <TextField
            name="password"
            register={register({
              required: true,
              maxLength: 255,
              minLength: 5,
            })}
            type="password"
            label="Hasło"
            placeholder="Hasło"
            icon="lock"
            errors={errors}
            onChange={() => setErrorMessage(undefined)}
          />
          <Error>{errorMessage}</Error>
          <div className={styles.buttonsWrapper}>
            <Button type="submit" loading={loadingRequest} disabled={loadingRequest}>
              Zaloguj
            </Button>
            <Button type="button" onClick={() => history.push('/user/register')}>
              Zarejestruj się
            </Button>
          </div>
        </Form>
        <p>Dashboard ver. 1.0.40</p>
      </div>
    </>
  );
};

export default Login;

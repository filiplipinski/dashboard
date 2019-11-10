import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import cx from 'classnames';
import styles from '../../styles.module.scss';
import { RouteComponentProps } from 'react-router-dom';

import { TextField, Button, Form } from 'modules/Form';
import { IRegisterUser } from 'modules/User/models';
import Error from 'modules/App/components/Error';
import Logo from 'modules/App/components/Logo';
import { translateMessages } from 'utils';
import useRequestApi, { IRequestData } from 'utils/http';

interface IRegisterResponse extends IRequestData {
  data: {
    success: string;
    message: string;
  };
  errors: string;
}

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(undefined as undefined | string);

  const {
    called,
    loading,
    requestApi,
    data,
    errors: errorsRequest,
  } = useRequestApi() as IRegisterResponse;

  useEffect(() => {
    if (data && data.success) {
      history.push('/user/login');
    } else {
      const err =
        errorsRequest === 'Email address exists unavailable'
          ? translateMessages(errorsRequest)
          : 'Nie udało się zarejestrować';
      if (called) setErrorMessage(err);
    }
  }, [data, errorsRequest]);

  const { register, handleSubmit, watch, errors } = useForm<IRegisterUser>();
  const onSubmit = ({ userName, emailAddress, password }: IRegisterUser) => {
    requestApi('api/user/register', 'POST', undefined, {
      disableJwtAuth: true,
      Authorization: `Basic ${btoa(`${userName}:${password}:${emailAddress}`)}`,
    });
  };

  return (
    <>
      {/* <Logo /> */}
      <div className={styles.wrapper}>
        <Form onSubmit={handleSubmit(onSubmit as any)}>
          <h1 className={cx(styles.header, 'subtitle is-2')}>Rejestracja</h1>
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
          />
          <TextField
            name="emailAddress"
            register={register({ required: true })}
            type="email"
            label="Email"
            placeholder="Email"
            icon="envelope"
            errors={errors}
            onChange={() => setErrorMessage(undefined)}
          />
          <TextField
            name="password"
            register={register({
              required: true,
              maxLength: 255,
              minLength: 5,
              validate: value => value === watch('passwordConfirm'),
            })}
            type="password"
            label="Hasło"
            placeholder="Hasło"
            icon="lock"
            errors={errors}
          />
          <TextField
            name="passwordConfirm"
            register={register({
              required: true,
              maxLength: 255,
              minLength: 5,
              validate: value => value === watch('password'),
            })}
            type="password"
            label="Potwierdź hasło"
            placeholder="Potwierdź hasło"
            icon="lock"
            errors={errors}
          />
          <Error>{errorMessage}</Error>

          <div className={styles.buttonsWrapper}>
            <Button type="submit" loading={loading} disabled={loading}>
              Zarejestruj
            </Button>
            <Button type="button" onClick={() => history.push('/user/login')}>
              Zaloguj się
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;

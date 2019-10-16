import React, { useState } from "react";
import useForm from "react-hook-form";
import cx from "classnames";
import styles from "./styles.module.scss";
import { RouteComponentProps } from "react-router-dom";

import { TextField, Button, Form } from "modules/Form";
import { IRegisterUser } from "modules/User/models";
import Error from "modules/User/components/Error";
import { requestApi, translateMessages } from "utils";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(undefined as
    | undefined
    | string);

  const { register, handleSubmit, watch, errors } = useForm<IRegisterUser>();
  const onSubmit = ({ userName, emailAddress, password }: IRegisterUser) => {
    const responseData = requestApi("api/user/register", "POST", undefined, {
      Authorization: `Basic ${btoa(`${userName}:${password}:${emailAddress}`)}`
    });

    responseData.then(data => {
      if (data && data.success) history.push("/user/login");
      else {
        const error = data.hasOwnProperty("error")
          ? translateMessages(data.error)
          : "Nie udało się zarejestrować";

        setErrorMessage(error);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit(onSubmit as any)}>
        <h1 className={cx(styles.header, "subtitle is-2")}>Rejestracja</h1>
        <TextField
          name="userName"
          register={register({ required: true, maxLength: 255, minLength: 5 })}
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
            validate: value => value === watch("passwordConfirm")
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
            validate: value => value === watch("password")
          })}
          type="password"
          label="Potwierdź hasło"
          placeholder="Potwierdź hasło"
          icon="lock"
          errors={errors}
        />
        <Error>{errorMessage}</Error>
        <div className="buttons">
          <Button type="submit">Zarejestruj</Button>
          <div className={styles.stickRight}>
            <Button type="button" onClick={() => history.push("/user/login")}>
              Zaloguj się
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Register;

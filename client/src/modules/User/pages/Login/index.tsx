import React, { useState } from "react";
import useForm from "react-hook-form";
import styles from "./styles.module.scss";
import cx from "classnames";
import { RouteComponentProps } from "react-router-dom";

import { TextField, Button, Form } from "modules/Form";
import { ILoginUser } from "modules/User/models";
import Error from "modules/User/components/Error";
import { requestApi, setToken, translateMessages } from "utils";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(undefined as
    | undefined
    | string);

  const { register, handleSubmit, errors } = useForm<ILoginUser>();
  const onSubmit = ({ userName, password }: ILoginUser) => {
    const responseData = requestApi("api/user/login", "POST", undefined, {
      Authorization: `Basic ${btoa(`${userName}:${password}`)}`
    });

    responseData.then(data => {
      if (data && data.success) {
        setToken(data.tokenData);
        history.push("/");
      } else {
        const error = data.hasOwnProperty("error")
          ? translateMessages(data.error)
          : "Nie udało się zalogować";

        setErrorMessage(error);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit(onSubmit as any)}>
        <h1 className={cx(styles.header, "subtitle is-2")}>Logowanie</h1>
        <TextField
          name="userName"
          register={register({ required: true, maxLength: 255, minLength: 5 })}
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
            minLength: 5
          })}
          type="password"
          label="Hasło"
          placeholder="Hasło"
          icon="lock"
          errors={errors}
          onChange={() => setErrorMessage(undefined)}
        />
        <Error>{errorMessage}</Error>
        <Button type="submit" text="Zaloguj" />
      </Form>
    </div>
  );
};

export default Login;

import React from "react";
import useForm from "react-hook-form";
import cx from "classnames";
import styles from "./styles.module.scss";
import { RouteComponentProps } from "react-router-dom";

import { TextField, Button, Form } from "modules/Form";
import { User } from "modules/User/models";
import requestApi from "utils/http";

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = ({ userName, emailAddress, password }: User) => {
    const responseData = requestApi("api/user/register", "POST", undefined, {
      Authorization: `Basic ${btoa(`${userName}:${password}:${emailAddress}`)}`
    });

    responseData.then(data => {
      if (data && data.success) history.push("/user/login");
    });
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit(onSubmit as any)}>
        <h1 className={cx(styles.header, "subtitle is-2")}>Rejestracja</h1>
        <TextField
          name="userName"
          register={register({ required: true, maxLength: 20, minLength: 5 })}
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
        />
        <TextField
          name="password"
          register={register({
            required: true,
            maxLength: 30,
            minLength: 8,
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
            maxLength: 30,
            minLength: 8,
            validate: value => value === watch("password")
          })}
          type="password"
          label="Potwierdź hasło"
          placeholder="Potwierdź hasło"
          icon="lock"
          errors={errors}
        />
        <Button type="submit" text="Zarejestruj" />
      </Form>
    </div>
  );
};

export default Register;

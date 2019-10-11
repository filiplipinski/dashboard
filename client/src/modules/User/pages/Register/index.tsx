import React from "react";
import useForm from "react-hook-form";
import { TextField, Button, Form } from "modules/Form";

import styles from "./styles.module.scss";
import cx from "classnames";

interface User {
  userName: string;
  emailAddress: string;
  password: string;
}

const Register: React.SFC = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data: User) => {
    console.log("submit data", data);
  };

  return (
    <div className={styles.wrapper}>
      <Form onSubmit={handleSubmit(onSubmit as any)}>
        <h1 className={cx(styles.header, "subtitle is-2")}>Rejestracja</h1>
        <TextField
          name="userName"
          register={register({ required: true })}
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

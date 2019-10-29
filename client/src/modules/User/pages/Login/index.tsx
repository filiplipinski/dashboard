import React, { useState, useEffect } from "react";
import useForm from "react-hook-form";
import styles from "./styles.module.scss";
import cx from "classnames";
import { RouteComponentProps } from "react-router-dom";

import { TextField, Button, Form } from "modules/Form";
import { ILoginUser } from "modules/User/models";
import Error from "modules/User/components/Error";
import Logo from "modules/App/components/Logo";
import { setToken, translateMessages } from "utils";
import useRequestApi, { IRequestData } from "utils/http2";

interface ILoginResponse extends IRequestData {
  data: {
    success: string;
    tokenData:
      | {
          token: any;
          expirationDate: string;
        }
      | any;
    error: string;
  };
  errors: {
    error: string;
  };
}

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [errorMessage, setErrorMessage] = useState(undefined as
    | undefined
    | string);

  const { register, handleSubmit, errors } = useForm<ILoginUser>();

  const {
    called,
    loading: loadingRequest,
    requestApi: requestApi,
    data,
    errors: errorsRequest
  } = useRequestApi() as ILoginResponse;

  useEffect(() => {
    if (data && data.success) {
      setToken(data.tokenData);
      history.push("/");
    } else {
      // TODO: Przemyslec czy chce odzielac error i data. moze wszystko do jednego lepiej
      const error = errorsRequest.error
        ? translateMessages(errorsRequest.error)
        : "Nie udało się zalogować";
      if (called) setErrorMessage(error);
    }
  }, [data, errorsRequest]);

  const onSubmit = ({ userName, password }: ILoginUser) => {
    requestApi("api/user/login", "POST", undefined, {
      Authorization: `Basic ${btoa(`${userName}:${password}`)}`
    });
    // const responseData = requestApi("api/user/login", "POST", undefined, {
    //   Authorization: `Basic ${btoa(`${userName}:${password}`)}`
    // });

    // responseData.then(data => {
    //   if (data && data.success) {
    //     setToken(data.tokenData);
    //     history.push("/");
    //   } else {
    //     const error = data.hasOwnProperty("error")
    //       ? translateMessages(data.error)
    //       : "Nie udało się zalogować";

    //     setErrorMessage(error);
    //   }
    // });
  };

  return (
    <>
      {/* <Logo /> */}
      <div className={styles.wrapper}>
        <Form onSubmit={handleSubmit(onSubmit as any)}>
          <h1 className={cx(styles.header, "subtitle is-2")}>Logowanie</h1>
          <TextField
            name="userName"
            register={register({
              required: true,
              maxLength: 255,
              minLength: 5
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
          <div className="field is-grouped">
            <Button type="submit" loading={loadingRequest}>
              Zaloguj
            </Button>
            <div className={styles.stickRight}>
              <Button
                type="button"
                onClick={() => history.push("/user/register")}
              >
                Zarejestruj się
              </Button>
            </div>
          </div>
        </Form>
        <p>Dashboard ver. 1.0.21</p>
      </div>
    </>
  );
};

export default Login;

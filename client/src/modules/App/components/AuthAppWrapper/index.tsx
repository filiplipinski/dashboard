import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import useRequestApi from "utils/http";
import styles from "./styles.module.scss";

const AuthAppWrapper: React.FC = ({ children }) => {
  const { called, loading, requestApi, data, errors } = useRequestApi() as any;

  useEffect(() => {
    const jwtToken = Cookies.get("AUTHORIZATION_JWT");
    requestApi("api/user/authenticate", "POST", undefined, {
      Authorization: jwtToken && `Bearer ${jwtToken}`
    });
  }, []);

  const loadingDone = () => {
    if (data && data.authenticate) return children;
    if (errors && errors.error) return <Redirect to="user/login" />;
  };

  return (
    <>
      {called && loading ? (
        <div className={styles.centerLoading}>
          <ReactLoading
            type={"balls"}
            color={"#3b7dd8"}
            height={"100%"}
            width={"100%"}
          />
        </div>
      ) : (
        loadingDone()
      )}
    </>
  );
};

export default AuthAppWrapper;

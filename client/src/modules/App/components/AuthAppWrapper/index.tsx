import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import requestApi from "utils/http";
import styles from "./styles.module.scss";

const AuthAppWrapper: React.FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("wait");

  useEffect(() => {
    const jwtToken = Cookies.get("AUTHORIZATION_JWT");
    const responseData = requestApi("api/user/authenticate", "GET", undefined, {
      Authorization: jwtToken && `Bearer ${jwtToken}`
    });

    responseData
      .then(data => {
        if (data && data.authenticate) {
          setIsAuthenticated("ok");
        } else setIsAuthenticated("wrong");
      })
      .catch(err => {
        console.log("jakis er", err);
        setIsAuthenticated("wrong");
      });
  }, []);

  const loadingDone = () => {
    if (isAuthenticated === "ok") return children;
    else return <Redirect to="user/login" />;
  };

  return (
    <>
      {isAuthenticated === "wait" ? (
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

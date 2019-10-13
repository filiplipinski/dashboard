import React, { Component, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import ReactLoading from "react-loading";
import requestApi from "utils/http";

const withAuth = (Component: any) => {
  return (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState("wait");
    const jwtToken = Cookies.get("AUTHORIZATION_JWT");

    useEffect(() => {
      const responseData = requestApi(
        "api/user/authenticate",
        "GET",
        undefined,
        {
          Authorization: `Bearer ${jwtToken}`
        }
      );

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
      if (isAuthenticated === "ok") return <Component {...props} />;
      else return <Redirect to="user/login" />;
    };

    return (
      <>
        {isAuthenticated === "wait" ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              height: "100px",
              width: "100px",
              transform: "translate(-50%, -50%)"
            }}
          >
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
};

export default withAuth;

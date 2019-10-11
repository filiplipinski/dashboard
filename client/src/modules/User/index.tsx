import React from "react";
import { Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";

export const UserRoutes = [
  <Route key="register-user" path="/user/register" component={Register} />,
  <Route key="login-user" path="/user/login" component={Login} />
];

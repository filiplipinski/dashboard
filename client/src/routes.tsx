import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "modules/App";
import { UserRoutes } from "modules/User";
import AuthAppWrapper from "modules/App/components/AuthAppWrapper";
import Dashboard from "modules/Dashboard";
import NavBar from "modules/NavBar";

const Routes = () => {
  return (
    <App>
      <Suspense fallback={<div />} />

      <BrowserRouter>
        <Switch>
          {UserRoutes}
          {/* <Route path="/" component={Dashboard} />   */}
          <Route
            path="/"
            render={() => (
              <AuthAppWrapper>
                <NavBar />
                <Route path="/" component={Dashboard} />
              </AuthAppWrapper>
            )}
          />
          {/* <Route render={() => <Redirect to="/" />} /> */}
        </Switch>
      </BrowserRouter>
    </App>
  );
};

export default Routes;

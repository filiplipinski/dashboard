import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "modules/App";
import Dashboard from "modules/Dashboard";
import { UserRoutes } from "modules/User";
import withAuth from "utils/withAuth";

const Routes = () => {
  return (
    <App>
      <Suspense fallback={<div />} />

      <BrowserRouter>
        <Switch>
          {UserRoutes}
          <Route path="/" component={withAuth(Dashboard)} />
          {/* <Route render={() => <Redirect to="/" />} /> */}
        </Switch>
      </BrowserRouter>
    </App>
  );
};

export default Routes;

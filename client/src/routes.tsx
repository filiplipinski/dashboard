import React, { Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import App from "modules/App";
import Dashboard from "modules/Dashboard";
import { UserRoutes } from "modules/User";

const Routes = () => {
  return (
    <App>
      <Suspense fallback={<div />} />

      <BrowserRouter>
        <Switch>
          {UserRoutes}
          <Route exact path="/" component={Dashboard} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </BrowserRouter>
    </App>
  );
};

export default Routes;

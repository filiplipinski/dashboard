import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import App from 'modules/App';
import { UserRoutes } from 'modules/User';
import AuthAppWrapper from 'modules/App/components/AuthAppWrapper';
import Tickets from 'modules/Tickets';
import Groups from 'modules/Groups';
import NavBar from 'modules/App/components/NavBar';
// import Breadcrumb from 'modules/App/components/Breadcrumb';
// import SideMenu from 'modules/App/components/SideMenu';

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
                {/* <Breadcrumb /> */}
                {/* <div style={{ display: "flex", height: "calc(100% - 52px)" }}>
                  <SideMenu /> */}
                <Switch>
                  <Redirect exact from="/" to="/tickets/list" />
                  <Route path="/tickets" component={Tickets} />
                  <Route path="/groups" component={Groups} />
                  <Route render={() => <Redirect to="/" />} />
                </Switch>

                {/* </div> */}
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

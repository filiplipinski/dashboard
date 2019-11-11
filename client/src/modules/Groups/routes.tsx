import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Add from 'modules/Groups/pages/Add';

const TicketsRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/add`} component={Add} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default TicketsRoutes;

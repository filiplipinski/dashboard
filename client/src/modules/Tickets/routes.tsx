import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Show from 'modules/Tickets/pages/Show';
import List from 'modules/Tickets/pages/List';
import Add from 'modules/Tickets/pages/Add';

const TicketsRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      <Route exact path={`${match.path}/add`} component={Add} />
      <Route exact path={`${match.path}/list`} component={List} />
      <Route exact path={`${match.path}/show/:id`} component={Show} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default TicketsRoutes;

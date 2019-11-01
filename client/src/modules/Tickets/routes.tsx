import React from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Show from 'modules/Tickets/pages/Show';

const TicketsRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <Switch>
      {/* <Route exact path="/list" component={List} /> */}
      {/* <Route exact path="/add" component={Add} /> */}
      <Route exact path={`${match.path}/show/:id`} component={Show} />
      {/* <Route exact path="/edit/:_id" component={Edit} /> */}
      <Route render={() => <Redirect to="/" />} />

      {/* <Redirect from={`${match.url}/*`} to={`${match.url}/list`} /> */}
    </Switch>
  );
};

export default TicketsRoutes;

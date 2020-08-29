import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Event from '../pages/Event';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/event" component={Event} />
  </Switch>
);

export default Routes;

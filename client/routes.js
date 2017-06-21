import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
    </Switch>
  </main>
);

export default Routes;

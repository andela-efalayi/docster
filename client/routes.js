import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index.jsx';
import UserPage from './components/pages/UserPage.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/home" component={UserPage} />
    </Switch>
  </main>
);

export default Routes;

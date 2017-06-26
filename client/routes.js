import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index.jsx';
import UserPage from './components/pages/UserPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
// import requireAuth from './RequireAuth.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/home" component={UserPage} />
      <Route path="/profile" component={ProfilePage} />
    </Switch>
  </main>
);

export default Routes;

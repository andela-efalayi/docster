import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index.jsx';
import UserPage from './components/pages/UserPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import AccessPage from './components//pages/AccessPage.jsx';
import UsersPage from './components//pages/UsersPage.jsx';
import RolesPage from './components/pages/RolesPage.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/app" component={UserPage} />
      <Route path="/app/:access" component={AccessPage} />           
      <Route path="/profile" component={ProfilePage} />
      <Route exact path="/allusers" component={UsersPage} />
      <Route exact path="/allroles" component={RolesPage} />  
    </Switch>
  </main>
);

export default Routes;

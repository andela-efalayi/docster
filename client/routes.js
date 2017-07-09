import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Index from './components/Index.jsx';
import UserPage from './components/pages/UserPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import AccessPage from './components//pages/AccessPage.jsx';
import AllUsersPage from './components//pages/AllUsersPage.jsx';
import AllRolesPage from './components/pages/AllRolesPage.jsx';

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/app" component={UserPage} />
      <Route path="/app/:access" component={AccessPage} />           
      <Route path="/profile" component={ProfilePage} />
      <Route exact path="/allusers" component={AllUsersPage} />
      <Route exact path="/allroles" component={AllRolesPage} />  
    </Switch>
  </main>
);

export default Routes;

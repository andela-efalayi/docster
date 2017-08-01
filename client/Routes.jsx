import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Index from './components/Index.jsx';
import DocumentsPage from './components/pages/DocumentsPage.jsx';
import ProfilePage from './components/pages/ProfilePage.jsx';
import AllUsersPage from './components//pages/AllUsersPage.jsx';
import AllRolesPage from './components/pages/AllRolesPage.jsx';
import AccessDeniedPage from './components/pages/AccessDeniedPage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import { isAdmin } from './utils/CheckUserIdentity';

const RequireToken = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('docsterToken') ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
    localStorage.getItem('docsterToken') && isAdmin() === true ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/access-denied',
        state: { from: props.location }
      }}
      />
    )
  )}
  />
);

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Index} />
      <RequireToken exact path="/my-documents" component={DocumentsPage} />
      <RequireToken exact path="/public-documents" component={DocumentsPage} />
      <RequireToken exact path="/role-documents" component={DocumentsPage} />   
      <RequireToken path="/profile" component={ProfilePage} />        
      <AdminRoute exact path="/allusers" component={AllUsersPage} />
      <AdminRoute exact path="/allroles" component={AllRolesPage} /> 
      <Route path="/access-denied" component={AccessDeniedPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </main>
);

RequireToken.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};
RequireToken.defaultProps = {
  location: {}
};
AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};
AdminRoute.defaultProps = {
  location: {}
};
export default Routes;

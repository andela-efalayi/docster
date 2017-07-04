import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return(
    <Route 
      {...rest} 
      render={(props) => (
      props.auth.isAuthenticated ? (
        <Component />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}
        />
      )
    )}
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps)(PrivateRoute);
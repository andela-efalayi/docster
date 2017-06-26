import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme2 } from '../../muiTheme';

const UserForm = ({ userDetails }) => {
  return(
    <div className="container">
      <form action="">
        <div className="row">
          <div className="twelve columns">
            <label htmlFor="fullName">Full Name</label>
            <input 
              type="text" 
              className="u-full-width"
              name="fullName"
              placeholder={userDetails.fullName || ''}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="userName">User Name</label>
            <input 
              type="text" 
              className="u-full-width"
              name="userName"
              placeholder={userDetails.userName || ''}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              className="u-full-width"
              name="email"
              placeholder={userDetails.email || ''}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="u-full-width"
              name="password"
              placeholder="password"
            />
          </div>
        </div>
      </form>
      <div className="center-btn">
        <MuiThemeProvider muiTheme={muiTheme2}> 
          <RaisedButton 
            label="update"
            primary
            fullWidth
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  userDetails: PropTypes.object.isRequired
};

export default UserForm;

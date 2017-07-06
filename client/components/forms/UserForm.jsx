import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { muiTheme2 } from '../../muiTheme';
import TextInputField from '../common/TextInputField.jsx';


const UserForm = (
  { disabled, onInputChange, onPasswordFieldChange,
    userDetails, updateUser }) => {
  return(
    <div className="container">
      <form action="">
        <div className="row">
          <div className="twelve columns">
            <label htmlFor="fullName">Full Name</label>
            <TextInputField
              type="text"
              name="fullName"
              value={userDetails.fullName || ''}
              placeholder="Full Name"
              onInputChange={onInputChange}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="userName">User Name</label>
            <TextInputField
              type="text"
              name="userName"
              value={userDetails.userName || ''}
              placeholder="UserName"
              onInputChange={onInputChange}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="email">Email</label>
            <TextInputField
              type="email"
              name="email"
              value={userDetails.email || ''}
              placeholder="Email"
              onInputChange={onInputChange}
            />
          </div>
          <div className="twelve columns">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              className="u-full-width"
              name="typedPassword"
              placeholder="Password"
              onChange={onPasswordFieldChange}
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
            onClick={updateUser}
            disabled={disabled}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

UserForm.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onPasswordFieldChange: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
};

export default UserForm;

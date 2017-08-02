import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { muiTheme1 } from '../../muiTheme';
import TextInputField from '../common/TextInputField.jsx';
import { formIsValid } from '../../utils/Validate';
import showToast from '../../utils/ShowToast';
import  * as createNewUser from '../../actions/CreateNewUser';

/**
 * @class SignUpForm
 * @extends {Component}
 */
class SignUpForm extends Component {

  /**
   * Create an instance of SignUpForm
   * @param {any} props
   * @param {object} context
   * @memberof SignUpForm
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      fullName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
  }

  /**
   * Get user details from form fields
   * @memberof SignUpForm
   * @param {object} event
   * @return {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Validate signup form
   * @memberof SignUpForm
   * @returns {bool} hasData
   */
  validateForm() {
    const { errors, isValid } = formIsValid(this.state);
    if(isValid === false) {
      this.setState({
        errors
      });
    }
    return isValid;
  }

  /**
   * Create a new user in the database and automatically sign in the user
   * @memberof SignUpForm
   * @return {void}
   */
  createNewUser() {
    this.setState({
      errors: {}
    }); 
    if(this.validateForm() === true) {
      this.props.actions.createNewUser(this.state)
      .then(() => {
        this.context.router.history.push('/my-documents');
      })
      .catch(errorMessage => {
        showToast(errorMessage, 'error');
      });
    }
  }

  /**
   * Render SignUpForm in the DOM
   * @memberof SignUpForm
   * @return {object} react-component
   */
  render() { 
    return (
      <div>
        <h5 className="center">New Here? Signup for free</h5>
        <form action="">
          <div className="row">
            <TextInputField
              error={this.state.errors.fullName}
              type="text"
              name="fullName"
              value={this.state.fullName}
              placeholder="Full Name"
              onInputChange={this.onInputChange}
            />
            <TextInputField
              error={this.state.errors.userName}
              type="text"
              name="userName"
              value={this.state.userName}
              placeholder="Username"
              onInputChange={this.onInputChange}
            />
            <TextInputField
              error={this.state.errors.email}
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Email"
              onInputChange={this.onInputChange}
            />
            <TextInputField
              error={this.state.errors.password}
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onInputChange={this.onInputChange}
            />
            <TextInputField
              error={this.state.errors.confirmPassword}
              type="password"
              name="confirmPassword"
              value={this.state.confirmPassword}
              placeholder="Confirm Password"
              onInputChange={this.onInputChange}
            />
          </div>
        </form>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <RaisedButton
            className="signup-btn"
            label="Sign Up"
            fullWidth
            primary
            onClick={this.createNewUser}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

// Set SignUpForm proptypes
SignUpForm.propTypes = {
  actions: PropTypes.object.isRequired,
};

// Set SignUpForm contexttypes
SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
}

// Maps state to this.props
const mapStateToProps = (state) => {
  return {
    payload: state.auth
  };
}

// Map dispatched action {createNewUser} to this.props
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(createNewUser, dispatch)
  };
}

// Connect SignUpForm to store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);

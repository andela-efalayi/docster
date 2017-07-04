import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { muiTheme1 } from '../../muiTheme';
import TextInputField from '../common/TextInputField.jsx';
import { formIsValid } from '../../utils/Validate';
import  * as authenticate from '../../actions/Authenticate';

/**
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {

  /**
   * Create an instance of SignInForm.
   * @memberof SignInForm
   * @param {object} props
   * @param {object} context
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: '',
      password: '',
      errors: {}
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.authenticateUser = this.authenticateUser.bind(this); 
  }

  /**
   * Get user details from form fields
   * @param {object} event
   * @memberof SignInForm
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  /**
   * @memberof SignInForm
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
   * Post user data to the server and verify details
   * @memberof SignInForm
   * @returns {void}
   */
  authenticateUser() {
    if(this.validateForm() === true) {
      this.props.actions.loginUser(this.state)
      .then(
        () => {
        this.context.router.history.push('/app');
      })
      .catch(error => {
        console.log(error);
      });
      this.setState({
        errors: {}
      }); 
    }
  }

  /**
   * Render SignInForm in the DOM
   * @memberof SignInForm
   * @returns {object} react-component
   */
  render() {
    return (
      <div>
        <h5 className="center">Existing User</h5>
        <form>
          <div className="row">
            <TextInputField
              error={this.state.errors.user}
              type="text"
              name="user"
              value={this.state.user}
              placeholder="Username or Email"
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
          </div>
        </form>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <RaisedButton
            label="Sign In"
            fullWidth
            primary
            onClick={this.authenticateUser}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

// Set SignInForm proptypes
SignInForm.propTypes = {
  actions: PropTypes.object.isRequired,
};

// Set SignInForm contectypes
SignInForm.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this.props
const mapStateToProps = (state) => {
  return {
    payload: state.auth
  }
}

// Map dispatched action to this.props
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(authenticate, dispatch)
  }
}

// Connect SignInForm to store
export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);

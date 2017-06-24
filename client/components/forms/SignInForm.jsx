import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import muiTheme from '../../muiTheme';
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
      password: ''
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
   * Post user data to the server and verify details
   * @memberof SignInForm
   * @returns {void}
   */
  authenticateUser() {
    this.props.actions.loginUser(this.state).then(() => {
      this.context.router.history.push('/home');
    });
  }

  /**
   * Render SignInForm in the DOM
   * @memberof SignInForm
   * @returns {object} react-component
   */
  render() {
    return (
      <div>
        <h5>Existing User.</h5>
        <form action="">
          <div className="row">
            <div className="twelve columns">
              <input
                className="u-full-width"
                type="text"
                name="user"
                value={this.state.user}
                placeholder="Username or Email"
                onChange={this.onInputChange}
              />
            </div>
            <div className="twelve columns">
              <input
                className="u-full-width"
                type="password"
                name="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.onInputChange}
              />
            </div>
          </div>
        </form>
        <MuiThemeProvider muiTheme={muiTheme}>
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

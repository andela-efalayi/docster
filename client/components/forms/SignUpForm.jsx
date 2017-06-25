import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import muiTheme from '../../muiTheme';
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
      password: ''
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
   * Create a new user in the database and automatically sign in the user
   * @memberof SignUpForm
   * @return {void}
   */
  createNewUser() {
    this.props.actions.createNewUser(this.state)
      .then(() => {
        this.context.router.history.push('/home');
      });
  }

  /**
   * Render SignUpForm in the DOM
   * @memberof SignUpForm
   * @return {object} react-component
   */
  render() { 
    return (
      <div>
        <h5>New Here? Signup for free.</h5>
        <form action="">
          <div className="row">
            <div className="twelve columns">
              <input
                className="u-full-width"
                type="text"
                name="fullName"
                value={this.state.fullName}
                placeholder="Full Name"
                onChange={this.onInputChange}
              />
            </div>
            <div className="twelve columns">
              <input
                className="u-full-width"
                type="text"
                name="userName"
                value={this.state.userName}
                placeholder="User Name"
                onChange={this.onInputChange}
              />
            </div>
            <div className="twelve columns">
              <input
                className="u-full-width"
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Email"
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
const mapStateToProps = (state /*, ownProps*/) => {
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
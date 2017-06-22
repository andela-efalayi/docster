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
   * Creates an instance of SignUpForm.
   * @param {any} props
   * @memberof SignUpForm
   */
  constructor(props) {
    super(props);
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
   * Posts user data to the server
   * @memberof SignUpForm
   * @return {void}
   */
  createNewUser() {
    this.props.actions.createNewUser(this.state);
  }

  /**
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

SignUpForm.propTypes = {
  actions: PropTypes.object.isRequired,
  // users: PropTypes.array.isRequired
};

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    users: state.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(createNewUser, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpForm);

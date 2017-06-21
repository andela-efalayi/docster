import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import muiTheme from '../../muiTheme';


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
    this.sendFormData = this.sendFormData.bind(this);
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
  sendFormData() {
    console.log(this.state);
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
            onClick={this.sendFormData}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SignUpForm;

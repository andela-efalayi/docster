import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import muiTheme from '../../muiTheme';


/**
 * @class SignInForm
 * @extends {Component}
 */
class SignInForm extends Component {

  /**
   * Creates an instance of SignInForm.
   * @memberof SignInForm
   */
  constructor() {
    super();
    this.state = {
      user: '',
      password: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.sendFormData = this.sendFormData.bind(this);
  }

  /**
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
   * Posts user data to the server
   * @memberof SignInForm
   * @returns {void}
   */
  sendFormData() {
    console.log(this.state);
  }

  /**
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
            onClick={this.sendFormData}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default SignInForm;

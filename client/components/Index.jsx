import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import SignUpForm from './forms/SignUpForm.jsx';
import SignInForm from './forms/SignInForm.jsx';
import { muiTheme1 } from '../muiTheme';

/**
 * @class Index
 * @extends {Component}
 * @param {string} tab
 */
class Index extends Component {

  /**
   * Create an instance of Index
   * @memberof Index
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      message: 'a fullstack document management system.',
      tab: 'signup'
    };
    this.changeTab = this.changeTab.bind(this);
  }


  /**
   * Set selected tab
   * @param {any} tab 
   * @memberof Index
   * @returns {void}
   */
  changeTab(tab) {
    this.setState({
      tab
    });
  }
  
  /**
   * Render Index in the DOM
   * @memberof Index
   * @returns {object} react-element
   */
  render() {
    return (
      <div className="index-page container">
        <div className="intro">
          <h2>Docster</h2>
          <h6>{this.state.message}</h6>
        </div>
        <MuiThemeProvider muiTheme={muiTheme1}>
          <Tabs
            className="form-tabs"
            value={this.state.tab}
            onChange={this.changeTab}
          >
            <Tab
              label="Sign Up"
              value="signup"
            >
              <div className="form">
                <SignUpForm />
              </div>
            </Tab>
            <Tab
              label="Sign In"
              value="signin"
            >
              <div className="form">
                <SignInForm />
              </div>
            </Tab>
          </Tabs>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Index;

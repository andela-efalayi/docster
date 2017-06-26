import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../common/Header.jsx';
import UserForm from '../forms/UserForm.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { muiTheme1 } from '../../muiTheme';
import updateProfile from '../../actions/UpdateProfile';
/**
 * @class ProfilePage
 * @extends {Component}
 */
class ProfilePage extends Component {

  /**
   * Creates an instance of ProfilePage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = this.props.auth.currentUser;
    this.logoutUser = this.logoutUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @param {object} event 
   * @memberof ProfilePage
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Log user out of app and redirect to index page
   * @memberof UserPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser()
      this.context.router.history.push('/');
  }

  /**
   * @memberof ProfilePage
   * @returns {void}
   */
  updateUser() {
    this.props.updateProfile(this.state);
    this.state = this.props.auth.currentUser;
  }

  /**
   * @memberof ProfilePage
   * @returns {object} react-component
   */
  render() {
    return(
      <div>
        <Header 
          currentUser={this.state}
          logoutUser={this.logoutUser} 
        />
        <div className="profile-body">
          <div className="back container">
            <MuiThemeProvider muiTheme={muiTheme1}> 
              <RaisedButton 
                label="Back"
                primary
                containerElement={<Link to='/home' />}
              />
            </MuiThemeProvider>
          </div>
          <UserForm 
            userDetails={this.state} 
            updateUser={this.updateUser}
            onInputChange={this.onInputChange}
          />
        </div>
      </div>
    );
  }
}

// Set UserPage proptypes
ProfilePage.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
}

// Set UserPage contexttypes
ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth
  }
}

export default 
  connect(matchStateToProps, { logoutUser, updateProfile })(ProfilePage);

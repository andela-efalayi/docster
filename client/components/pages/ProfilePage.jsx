import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import HomeTab from '../common/HomeTab.jsx';

import UserForm from '../forms/UserForm.jsx';
import { logoutUser } from '../../actions/Authenticate';
import updateUser from '../../actions/UpdateUser';
import showToast from '../../utils/ShowToast';

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
    this.state = {
      user: this.props.auth.currentUser
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @param {object} event 
   * @memberof ProfilePage
   * @returns {void}
   */
  onInputChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;
    this.setState({
      user
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
  updateProfile() {
    this.props.updateUser(this.state.user)
    .then(() => {
      this.setState({
        state: this.props.auth.currentUser
      });
      showToast('Profile updated', 'success');      
    })
    .catch(errorMessage => {
      showToast(errorMessage, 'error');
    }); 
  }

  /**
   * @memberof ProfilePage
   * @returns {object} react-component
   */
  render() {
    return(
      <div id="profile">
        <Header 
          currentUser={this.state.user}
          logoutUser={this.logoutUser} 
        />
        <HomeTab title="profile" />
        <div className="profile-body">
          <UserForm 
            userDetails={this.state.user} 
            updateProfile={this.updateProfile}
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
  updateUser: PropTypes.func.isRequired
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
  connect(matchStateToProps, { logoutUser, updateUser })(ProfilePage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import { logoutUser } from '../../actions/Authenticate';
/**
 * @class UserPage
 * @extends {Component}
 */
class UserPage extends Component {

  /**
   * Create an instance of UserPage.
   * @param {object} props 
   * @param {object} context
   * @memberof UserPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: this.props.payload.currentUser
    };
    this.logoutUser = this.logoutUser.bind(this);
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
   * Render UserPage in the DOM
   * @memberof UserPage
   * @returns {object} react-component
   */
  render() {
    return(
      <Header currentUser={this.state.user} logoutUser={this.logoutUser} />
    );
  }
}

// Set UserPage proptypes
UserPage.propTypes = {
  payload: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

// Set UserPage contexttypes
UserPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    payload: state.auth
  }
}

// Connect UserPage to store
export default connect(matchStateToProps, { logoutUser })(UserPage);
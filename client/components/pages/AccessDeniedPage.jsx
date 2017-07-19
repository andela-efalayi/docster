import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/Authenticate';

/**
 * @class AccessDeniedPage
 * @extends {Component}
 */
class AccessDeniedPage extends Component {

  /**
   * Creates an instance of AccessDeniedPage.
   * @param {any} props 
   * @param {object} context
   * @memberof AccessDeniedPage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      user: this.props.auth.currentUser      
    };
    this.logoutUser = this.logoutUser.bind(this);
  }
  
  /**
   * Log user out of app and redirect to index page
   * @memberof AccessDeniedPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser()
      this.context.router.history.push('/');
  }

  /**
   * @memberof AccessDeniedPage
   * @returns {object} react-component
   */
  render() {
    return(
      <div>
        <div className="profile-body">
          <div className="back container">
            <div className="row">
              <div className="three columns">
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <h5 className="center">Sorry, You cannot access this page.</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Set AccessDeniedPage proptypes
AccessDeniedPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
}

// Set AccessDeniedPage contexttypes
AccessDeniedPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
  }
}

export default 
  connect(matchStateToProps,
  { logoutUser})(AccessDeniedPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import HomeTab from '../common/HomeTab.jsx';
import Documents from './Documents.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { loadUserDocuments } from '../../actions/LoadUserDocuments';
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
      user: this.props.auth.currentUser,
    };
    this.logoutUser = this.logoutUser.bind(this);
  }

  /**
   * @memberof UserPage
   * @return {void}
   */
  componentWillMount() {
    this.props.loadUserDocuments(this.state.user.id);
  }

  /**
   * Log user out of app and redirect to index page
   * @memberof UserPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser();
    this.context.router.history.push('/');
  }
  /**
   * Render UserPage in the DOM
   * @memberof UserPage
   * @returns {object} react-component
   */
  render() {
    const documents = this.props.documents;
    return(
      <div>
        <Header currentUser={this.state.user} logoutUser={this.logoutUser} />
        <HomeTab numberOfDocuments={documents.length || 0} />
        <div className="documents">
          <Documents documents={documents} />
        </div>
      </div>
    );
  }
}

// Set UserPage proptypes
UserPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  loadUserDocuments: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired
}

// Set UserPage contexttypes
UserPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    documents: state.documents
  }
}

// Connect UserPage to store
export default 
  connect(matchStateToProps, { logoutUser, loadUserDocuments })(UserPage);
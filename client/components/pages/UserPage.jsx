import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import HomeTab from '../common/HomeTab.jsx';
import Documents from '../common/Documents.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { getUserDocuments } from '../../actions/GetUserDocuments';

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
      searchString: ''
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @memberof UserPage
   * @return {void}
   */
  componentWillMount() {
    this.props.getUserDocuments(this.state.user.id);
  }

  /**
   * @param {object} event 
   * @memberof UserPage
   * @returns {void}
   */
  onInputChange(event) {
    const searchString = event.target.value;
    this.setState({
      searchString
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
    this.props.logoutUser();
    this.context.router.history.push('/');
  }

  /**
   * Render UserPage in the DOM
   * @memberof UserPage
   * @returns {object} react-component
   */
  render() {
    let documents = this.props.documents.filter(
      (document) => {
        return document.title.toLowerCase()
          .indexOf(this.state.searchString) !== -1
      }
    );
    return(
      <div>
        <Header currentUser={this.state.user} logoutUser={this.logoutUser} />
        <HomeTab
          numberOfDocuments={documents.length || 0}
          onInputChange={this.onInputChange}
          searchString={this.state.searchString}
          placeholder="Search My Documents"
        />
        <div className="documents">
          <div className="container">
            <Documents documents={documents} userId={this.state.user.id} />
          </div>
        </div>
      </div>
    );
  }
}

// Set UserPage proptypes
UserPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getUserDocuments: PropTypes.func.isRequired,
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
  connect(matchStateToProps, { logoutUser, getUserDocuments })(UserPage);
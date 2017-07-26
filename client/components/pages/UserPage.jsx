import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import HomeTab from '../common/HomeTab.jsx';
import Documents from '../common/Documents.jsx';
import PageNavigation from '../common/PageNavigation.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { getUserDocuments } from '../../actions/GetUserDocuments';
import { getPublicDocuments } from '../../actions/GetPublicDocuments';
import { getRoleDocuments } from '../../actions/GetRoleDocuments';
import QueryConstants from '../../../constants/QueryConstants';

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
      searchString: '',
      documents: [],
      pageTitle: '',
      documentsCount: 0,
      pageCount: 0
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.changePage = this.changePage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @memberof UserPage
   * @return {void}
   */
  componentDidMount() {
    const access = this.props.match.url;
    if( access === '/public-documents') {
      this.props.getPublicDocuments();
    }
    if( access === '/role-documents') {
      this.props.getRoleDocuments();
    }
    if( access === '/my-documents') {
      this.props.getUserDocuments(this.state.user.id);   
    }
  }

  /**
   * @param {object} nextProps 
   * @memberof UserPage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const access = nextProps.match.url;    
    if(nextProps.match.url !== this.props.match.url){
      if( access === '/public-documents') {
        this.props.getPublicDocuments();
      }
      if( access === '/role-documents') {
        this.props.getRoleDocuments();
      }
      if( access === '/my-documents') {
        this.props.getUserDocuments(this.state.user.id);   
      }
    }
    this.setState({
      documents: nextProps.documents.rows,
      documentsCount: nextProps.documents.count,
      pageTitle: access.split("/")[1].replace('-', ' '),
      pageCount: Math.ceil(
        nextProps.documents.count / QueryConstants.DEFAULT_LIMIT)
    });
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
   * @param {any} data 
   * @memberof UserPage
   * @returns {void}
   */
  changePage(data) {
    event.preventDefault();    
    const offset = data.selected * QueryConstants.DEFAULT_LIMIT;
    this.props.getUserDocuments(this.state.user.id, offset);
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
    const documents = this.state.documents;
    const displayDocuments = (typeof documents === 'undefined') ? 
    (<div className="center no-documents">
      <h4>no documents</h4>
    </div>) : 
    (<Documents
      documents={documents}
      userId={this.state.user.id}
    />); 
    
    return(
      <div id="user-page">
        <Header currentUser={this.state.user} logoutUser={this.logoutUser} />
        <HomeTab
          numberOfDocuments={this.state.documentsCount}
          onInputChange={this.onInputChange}
          searchString={this.state.searchString}
          placeholder="Filter My Documents"
          title={this.state.pageTitle}
        />
        <div className="container">
          <PageNavigation
            pageCount={this.state.pageCount}
            changePage={this.changePage}
          />
        </div>
        <div className="documents">
          <div className="container">
            {displayDocuments}
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
  getPublicDocuments: PropTypes.func.isRequired,
  getRoleDocuments: PropTypes.func.isRequired,
  getUserDocuments: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
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
  connect(matchStateToProps,
    { logoutUser, getPublicDocuments,
      getRoleDocuments, getUserDocuments })(UserPage);
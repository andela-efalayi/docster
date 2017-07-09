import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import BackButton from '../common/BackButton.jsx';
import Documents from '../common/Documents.jsx';
import SearchInputField from '../forms/SearchForm.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { getPublicDocuments } from '../../actions/GetPublicDocuments';
import { getRoleDocuments } from '../../actions/GetRoleDocuments';
import { getUserDocuments } from '../../actions/GetUserDocuments';
import PageNavigation from '../common/PageNavigation.jsx';
import QueryConstants from '../../../constants/QueryConstants';

/**
 * @class AccessPage
 * @extends {Component}
 */
class AccessPage extends Component {

  /**
   * Creates an instance of AccessPage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      accessTitle: '',
      documents: [],
      pageCount: 0,
      searchString: '',
      user: this.props.auth.currentUser      
    };
    this.changePage = this.changePage.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @memberof AccessPage
   * @returns {void}
   */
  componentDidMount() {
    const access = this.props.match.params.access;
    if( access === 'public-documents') {
      this.props.getPublicDocuments();
    }
    if( access === 'role-documents') {
      this.props.getRoleDocuments();
    }
  }

  /**
   * @memberof AccessPage
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const access = nextProps.match.params.access;    
    if(nextProps.match.params.access !== this.props.match.params.access){
      if( access === 'public-documents') {
        this.props.getPublicDocuments();
      }
      if( access === 'role-documents') {
        this.props.getRoleDocuments();
      }
    }
    this.setState({
      documents: nextProps.documents.rows,
      documentsCount: nextProps.documents.count,
      accessTitle: access.replace('-', ' '),
      pageCount: Math.ceil(
        nextProps.documents.count / QueryConstants.DEFAULT_LIMIT)
    });
  }

  /**
   * @param {object} event 
   * @memberof AccessPage
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      searchString: event.target.value
    });
  }
  
 /**
   * @param {object} data 
   * @memberof AccessPage
   * @returns {void}
   */
  changePage(data) {
    event.preventDefault();    
    const offset = data.selected * QueryConstants.DEFAULT_LIMIT;
    this.props.getUserDocuments(this.state.user.id, offset);
  }

  /**
   * Log user out of app and redirect to index page
   * @memberof AccessPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser()
      this.context.router.history.push('/');
  }

  /**
   * @memberof AccessPage
   * @returns {object} react-component
   */
  render() {
    let documents = this.state.documents.filter(
      (document) => {
        return document.title.toLowerCase()
          .indexOf(this.state.searchString) !== -1
      }
    );
    const numberOfDocuments = documents.length;
    return(
      <div>
        <Header 
          currentUser={this.state.user}
          logoutUser={this.logoutUser} 
        />
        <div className="profile-body">
          <div className="back container">
            <div className="row">
              <div className="three columns">
                <BackButton />
              </div>
              <div className="eight columns">
                <SearchInputField
                  type="text" 
                  searchString={this.state.searchString}
                  onInputChange={this.onInputChange}
                  placeholder="Search documents"
                />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="four columns">
                <h4>
                  {this.state.accessTitle}: 
                  <span>{this.state.documentsCount}</span>
                </h4>
              </div>
              <div className="eight columns">
                <PageNavigation
                  pageCount={this.state.pageCount}
                  changePage={this.changePage}
                />
              </div>
            </div>
            {
              numberOfDocuments === 0 &&
              <h4>No documents available</h4>
            }
            <div className="documents">
              <Documents documents={documents} userId={this.state.user.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Set AccessPage proptypes
AccessPage.propTypes = {
  auth: PropTypes.object.isRequired,
  documents: PropTypes.object.isRequired,
  getPublicDocuments: PropTypes.func.isRequired,
  getRoleDocuments: PropTypes.func.isRequired,
  getUserDocuments:PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

// Set AccessPage contexttypes
AccessPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    documents: state.documents
  }
}

export default 
  connect(matchStateToProps,
  { logoutUser, getPublicDocuments, 
    getRoleDocuments, getUserDocuments })(AccessPage);

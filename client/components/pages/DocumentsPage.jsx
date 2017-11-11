import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import HomeTab from '../common/HomeTab.jsx';
import Documents from '../common/Documents.jsx';
import PageNavigation from '../common/PageNavigation.jsx';
import { getUserDocuments } from '../../actions/GetUserDocuments';
import { getPublicDocuments } from '../../actions/GetPublicDocuments';
import { getRoleDocuments } from '../../actions/GetRoleDocuments';
import { searchDocuments } from '../../actions/Search';
import QueryConstants from '../../../constants/QueryConstants';

/**
 * @class DocumentsPage
 * @extends {Component}
 */
class DocumentsPage extends Component {

  /**
   * Create an instance of DocumentsPage.
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
    this.changePage = this.changePage.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @memberof DocumentsPage
   * @return {void}
   */
  componentDidMount() {
    const access = this.props.match.url;
    this.getDocuments(access);
  }

  /**
   * @param {object} nextProps 
   * @memberof UserPage
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    const access = nextProps.match.url;    
    if(nextProps.match.url !== this.props.match.url){
      this.getDocuments(access);
    }
    this.setState({
      documents: nextProps.documents.rows,
      documentsCount: nextProps.documents.count,
      errorMessage: '',
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
    this.props.searchDocuments(this.state.searchString).then(() => {
      this.setState({
        documents: this.props.searchResult.rows,
        documentsCount: this.props.searchResult.count,
        pageTitle: 'Search Result'
      });
    })
    .catch((errorMessage) => {
      this.setState({
        errorMessage
      });
    });
  }

  /**
   * @memberof DocumentsPage
   * @param {string} accessUrl
   * @param {number} offset
   * @return {void}
   */
  getDocuments(accessUrl, offset){
    if( accessUrl === '/public-documents') {
      this.props.getPublicDocuments(offset);
    }
    if( accessUrl === '/role-documents') {
      this.props.getRoleDocuments(offset);
    }
    if( accessUrl === '/my-documents') {
      this.props.getUserDocuments(this.state.user.id, offset);   
    }
  }

  /**
   * @param {any} data 
   * @memberof DocumentsPage
   * @returns {void}
   */
  changePage(data) {
    event.preventDefault();    
    const offset = data.selected * QueryConstants.DEFAULT_LIMIT;
    const accessUrl = this.props.match.url;
    this.getDocuments(accessUrl, offset);
  }

  /**
   * Render DocumentsPage in the DOM
   * @memberof UserPage
   * @returns {object} react-component
   */
  render() {
    const documents = this.state.documents;
    const displayDocuments = (typeof documents === 'undefined'
    || this.state.errorMessage) ? 
    (<div className="center no-documents">
      <h4>{this.state.errorMessage}</h4>
    </div>) : 
    (<Documents
      documents={documents}
      userId={this.state.user.id}
    />); 
    
    return(
      <div id="user-page" className="body">
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

// Set DocumentsPage proptypes
DocumentsPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getPublicDocuments: PropTypes.func.isRequired,
  getRoleDocuments: PropTypes.func.isRequired,
  getUserDocuments: PropTypes.func.isRequired,
  documents: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  searchDocuments: PropTypes.func.isRequired,
  searchResult: PropTypes.object.isRequired
}

// Set DocumentsPage contexttypes
DocumentsPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    documents: state.documents,
    searchResult: state.search
  }
}

// Connect DocumentsPage to store
export default 
  connect(matchStateToProps,
    { getPublicDocuments,
      getRoleDocuments, getUserDocuments, searchDocuments })(DocumentsPage);
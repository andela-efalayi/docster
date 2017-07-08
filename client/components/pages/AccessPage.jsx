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

/**
 * @class ProfilePage
 * @extends {Component}
 */
class AccessPage extends Component {

  /**
   * Creates an instance of ProfilePage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      accessTitle: '',
      documents: [],
      searchString: '',
      user: this.props.auth.currentUser      
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  /**
   * @memberof AccessPage
   * @returns {void}
   */
  componentWillMount() {
    const access = this.props.match.params.access;
    if( access === 'public-documents') {
      this.props.getPublicDocuments();
    }
    if( access === 'role-documents') {
      this.props.getRoleDocuments();
    }
    this.setState({
      documents: this.props.documents,
      accessTitle: access.replace('-', ' ')
    });
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
      documents: nextProps.documents,
      accessTitle: access.replace('-', ' ')
    });
  }

  /**
   * @param {object} event 
   * @memberof ProfilePage
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      searchString: event.target.value
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
              <BackButton />
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="five columns">
                <h5>
                  {this.state.accessTitle}: {numberOfDocuments}</h5>
              </div>
              <div className="six columns">
                <SearchInputField
                  type="text" 
                  searchString={this.state.searchString}
                  onInputChange={this.onInputChange}
                  placeholder="Search documents"
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

// Set UserPage proptypes
AccessPage.propTypes = {
  auth: PropTypes.object.isRequired,
  documents: PropTypes.array.isRequired,
  getPublicDocuments: PropTypes.func.isRequired,
  getRoleDocuments: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

// Set UserPage contexttypes
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
  { logoutUser, getPublicDocuments, getRoleDocuments })(AccessPage);

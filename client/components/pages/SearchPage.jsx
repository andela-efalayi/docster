import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../common/Header.jsx';
import Documents from '../common/Documents.jsx';

import { logoutUser } from '../../actions/Authenticate';
import { searchDocument } from '../../actions/SearchDocuments';
import BackButton from '../common/BackButton.jsx';

/**
 * @class ProfilePage
 * @extends {Component}
 */
class SearchPage extends Component {

  /**
   * Creates an instance of ProfilePage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      user: this.props.auth.currentUser,
      queryString: ''
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }


  /**
   * @memberof SearchPage
   * @returns {void}
   */
  componentWillMount() {
    this.setState({
      queryString: (this.context.router.route.location.search).split('?q=')[1]
    });
  }

  /** 
   * @memberof SearchPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.searchDocument(this.state.queryString);
  }

  /**
   * @memberof SearchPage 
   * @param {any} nextProps 
   * @returns {void}
   */
  componentWillUpdate(nextProps) {
    const newQueryString = nextProps.location.search.split('?q=')[1];
    if(newQueryString !== this.state.queryString){
      this.props.searchDocument(newQueryString);
    }
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
   * @returns {object} react-component
   */
  render() {
    const documents = this.props.searchResult;
    const searchLength = Object.keys(documents).length;
    return(
      <div>
        <Header 
          currentUser={this.state.user}
          logoutUser={this.logoutUser} 
        />
        <div className="profile-body">
          <div className="back container">
            <BackButton />
          </div>
          <div className="container">
            <h5>Documents found: 
              <span className="search">
                {searchLength}</span>
            </h5>
            <Documents documents={documents} />
          </div>
        </div>
      </div>
    );
  }
}

// Set UserPage proptypes
SearchPage.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
  searchDocument: PropTypes.func.isRequired
}

// Set UserPage contexttypes
SearchPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    searchResult: state.search
  }
}

export default 
  connect(matchStateToProps, { logoutUser, searchDocument })(SearchPage);

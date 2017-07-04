import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../common/Header.jsx';
import UsersTable from '../tables/UsersTable.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { muiTheme1 } from '../../muiTheme';
import { getAllUsers } from '../../actions/GetAllUsers';
import BackButton from '../common/BackButton.jsx';
/**
 * @class ProfilePage
 * @extends {Component}
 */
class UsersPage extends Component {

  /**
   * Creates an instance of ProfilePage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = this.props.auth.currentUser;
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }


  /**
   * @memberof UsersPage
   * @returns {void}
   */
  componentWillMount() {
    this.props.getAllUsers();
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
  const users = this.props.allUsers;    
    return(
      <div>
        <Header 
          currentUser={this.state}
          logoutUser={this.logoutUser} 
        />
        <div className="profile-body">
          <div className="back container">
            <BackButton />
          </div>
          <div className="container">
            <h3 className="center">Docster Users</h3>
            <MuiThemeProvider muiTheme={muiTheme1}>
              <UsersTable users={users} />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

// Set UserPage proptypes
UsersPage.propTypes = {
  allUsers: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired
}

// Set UserPage contexttypes
UsersPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    allUsers: state.users
  }
}

export default 
  connect(matchStateToProps, { logoutUser, getAllUsers })(UsersPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../common/Header.jsx';
import UsersTable from '../tables/UsersTable.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { muiTheme1 } from '../../muiTheme';
import { getAllUsers } from '../../actions/GetAllUsers';
import PageNavigation from '../common/PageNavigation.jsx';

/**
 * @class AllUsersPage
 * @extends {Component}
 */
class AllUsersPage extends Component {

  /**
   * Creates an instance of AllUsersPage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      currentUser: this.props.auth.currentUser,
      users: []
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.editRole = this.editRole.bind(this);
  }

  /**
   * @memberof AllUsersPage
   * @returns {void}
   */
  componentWillMount() {
    this.props.getAllUsers();
  }

  /**
   * @memberof AllUsersPage
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      users: nextProps.users.rows
    });
  }
  /**
   * @param {object} event 
   * @memberof AllUsersPage
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @param {any} data 
   * @memberof AllUsersPage
   * @returns {void}
   */
  changePage(data) {
    event.preventDefault();  
    // console.log(data);  
    // const offset = data.selected * QueryConstants.DEFAULT_LIMIT;
    // this.props.getUserDocuments(this.state.user.id, offset);
  }

  /**
   * @param {object} event 
   * @memberof AllUsersPage
   * @returns {void}
   */
  editRole(event){
    event.preventDefault();
    this.setState({
      edit: true
    });
  }
  /**
   * Log user out of app and redirect to index page
   * @memberof AllUsersPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser()
      this.context.router.history.push('/');
  }

  /**
   * @memberof AllUsersPage
   * @returns {object} react-component
   */
  render() {  
    return(
      <div>
        <Header 
          currentUser={this.state.currentUser}
          logoutUser={this.logoutUser} 
        />
        <div className="profile-body">
          <div className="container">
            <PageNavigation
              pageCount={1}
              changePage={this.changePage}
            />
          </div>
          <div className="container">
            <h3 className="center">Docster Users</h3>
            <MuiThemeProvider muiTheme={muiTheme1}>
              <UsersTable
                users={this.state.users}
              />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

// Set AllUsersPage proptypes
AllUsersPage.propTypes = {
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired
}

// Set AllUsersPage contexttypes
AllUsersPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    users: state.users,
    roles: state.roles
  }
}

export default 
  connect(matchStateToProps, { logoutUser, getAllUsers })(AllUsersPage);

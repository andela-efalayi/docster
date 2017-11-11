import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import UsersTable from '../tables/UsersTable.jsx';
import { muiTheme1 } from '../../muiTheme';
import { getAllUsers } from '../../actions/GetAllUsers';
import PageNavigation from '../common/PageNavigation.jsx';
import QueryConstants from '../../../constants/QueryConstants';

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
      users: [],
      usersCount: 0,
      pageCount: 0
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.editRole = this.editRole.bind(this);
    this.changePage = this.changePage.bind(this);
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
      users: nextProps.users.rows,
      usersCount: nextProps.users.count,
      pageCount: Math.ceil(
        nextProps.users.count / QueryConstants.DEFAULT_LIMIT)
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
    const offset = data.selected * QueryConstants.DEFAULT_LIMIT;
    this.props.getAllUsers(offset);
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
   * @memberof AllUsersPage
   * @returns {object} react-component
   */
  render() {  
    return(
      <div id="all-users" className="body">
        <div className="profile-body">
          <div className="container">
            <PageNavigation
              pageCount={this.state.pageCount}
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
  getAllUsers: PropTypes.func.isRequired
}

// Set AllUsersPage contexttypes
AllUsersPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    users: state.users
  }
}

export default 
  connect(matchStateToProps, {getAllUsers })(AllUsersPage);

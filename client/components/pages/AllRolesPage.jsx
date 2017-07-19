import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../common/Header.jsx';
import RolesTable from '../tables/RolesTable.jsx';
import { logoutUser } from '../../actions/Authenticate';
import { muiTheme1 } from '../../muiTheme';
import { getAllRoles } from '../../actions/GetAllRoles';

/**
 * @class AllRolesPage
 * @extends {Component}
 */
class AllRolesPage extends Component {

  /**
   * Creates an instance of AllRolesPage.
   * @param {any} props 
   * @param {object} context
   * @memberof ProfilePage
   */
  constructor(props, context){
    super(props, context);
    this.state = {
      currentUser: this.props.auth.currentUser,
      roles: []
    };
    this.logoutUser = this.logoutUser.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }


  /**
   * @memberof AllRolesPage
   * @returns {void}
   */
  componentDidMount() {
    this.props.getAllRoles();
  }

  /**
   * @memberof AllRolesPage
   * @param {object} nextProps
   * @returns {void}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      roles: nextProps.roles.rows
    });
  }

  /**
   * @param {object} event 
   * @memberof AllRolesPage
   * @returns {void}
   */
  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * Log user out of app and redirect to index page
   * @memberof AllRolesPage
   * @param {object} event
   * @returns {void}
   */
  logoutUser(event) {
    event.preventDefault();
    this.props.logoutUser()
      this.context.router.history.push('/');
  }

  /**
   * @memberof AllRolesPage
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
            <h3 className="center">Docster Roles</h3>
            <MuiThemeProvider muiTheme={muiTheme1}> 
              <RolesTable roles={this.state.roles} />
            </MuiThemeProvider>
          </div>
        </div>
      </div>
    );
  }
}

// Set AllRolesPage proptypes
AllRolesPage.propTypes = {
  auth: PropTypes.object.isRequired,
  getAllRoles: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  roles: PropTypes.object.isRequired
}

// Set AllRolesPage contexttypes
AllRolesPage.contextTypes = {
  router: PropTypes.object.isRequired
}

// Map state to this. props
const matchStateToProps = (state) => {
  return{
    auth: state.auth,
    roles: state.roles
  }
}

export default 
  connect(matchStateToProps, { logoutUser, getAllRoles })(AllRolesPage);

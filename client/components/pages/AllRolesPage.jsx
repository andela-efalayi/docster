import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RolesTable from '../tables/RolesTable.jsx';
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
   * @memberof AllRolesPage
   * @returns {object} react-component
   */
  render() {
    return(
      <div>
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
  connect(matchStateToProps, { getAllRoles })(AllRolesPage);

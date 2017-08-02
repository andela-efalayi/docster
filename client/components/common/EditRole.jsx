import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Done from 'material-ui/svg-icons/action/done';
import { blue500, red500 } from 'material-ui/styles/colors';
import setRoleType from '../../utils/SetRoleType';
import { getAllRoles } from '../../actions/GetAllRoles';
import updateUser from '../../actions/UpdateUser';
import showToast from '../../utils/ShowToast';

/**
 * @class EditRole
 * @extends {React.Component}
 */
class EditRole extends React.Component {
  /**
   * Creates an instance of EditUserRole.
   * @param {object} props 
   * @param {object} context
   * @memberof EditUserRole
   */
  constructor(props){
    super(props);
    this.state = {
      showField: false,
      userUpdate: {}
    };
    this.editRole = this.editRole.bind(this);    
    this.cancelEdit = this.cancelEdit.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.updateRole = this.updateRole.bind(this);
  }
  
  /**
   * Creates an instance of EditUserRole.
   * @param {object} context
   * @memberof EditUserRole
   * @return {void}
   */
  componentDidMount() {
    this.props.getAllRoles();
  }

  /**
   * Creates an instance of EditUserRole.
   * @param {object} event 
   * @memberof EditUserRole
   * @return {void}
   */
  onRoleChange(event) {
    const userUpdate = {
      id: this.props.user[0],
      newRole: event.target.value
    }
    this.setState({
      userUpdate
    });
  }
  /**
   * Creates an instance of EditUserRole.
   * @param {object} event 
   * @memberof EditUserRole
   * @return {void}
   */
  editRole(event) {
    event.preventDefault();
    this.setState({showField: true});
  }

  /**
   * Creates an instance of EditUserRole.
   * @memberof EditUserRole
   * @return {void}
   */
  cancelEdit() {
    this.setState({showField: false});
  }


  /**
   * Creates an instance of EditUserRole.
   * @param {object} event
   * @memberof EditUserRole
   * @return {void}
   */
  updateRole() {
    this.props.updateUser(this.state.userUpdate).then(() => {
      this.setState({showField: false});
      showToast('User role updated', 'success');
    })
    .catch(errorMessage => {
      showToast(errorMessage, 'error');
    });
  }

  /**
   * Get content from tinymce editor
   * @memberof EditRole
   * @returns {void}
   */
  render() {
    const {user, roles} = this.props;

    const td = (this.state.showField === false) ?
    (
      <div id="role-type">
        <span>{setRoleType(user[1])}</span>        
        <a href="" onClick={this.editRole} >
          change
        </a>
      </div>
    ): (
      <div id="edit"> 
        <select id="userRoleUpdate" onChange={this.onRoleChange}>
          {roles.rows.map(role => (
            <option value={role.roleType} key={role.id}>
              {role.roleType}
            </option>
          ))}
        </select>  
        <Done
          viewBox='0 -10 20 30'
          color={blue500}
          onClick={this.updateRole}
        />   
        <ContentClear
          viewBox='0 -10 20 30'
          color={red500}
          onClick={this.cancelEdit}
        />
      </div>
      );
    return (
      <div>
        {td}
      </div>
    );
  } 
}

EditRole.propTypes = {
  getAllRoles: PropTypes.func.isRequired,
  user: PropTypes.array.isRequired,
  roles: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return{
    roles: state.roles
  }
}
export default connect(mapStateToProps, { getAllRoles, updateUser })(EditRole);

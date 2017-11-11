import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import ConfirmActionDialog from '../dialogs/ConfirmActionDialog.jsx';
import { getAllRoles } from '../../actions/GetAllRoles';
import { updateUser } from '../../actions/UpdateUser';
import showToast from '../../utils/ShowToast';
import setRoleType from '../../utils/SetRoleType';

const styles = {
  customWidth: {
    width: 169,
  },
};

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
      openDialog: false,
      userId: this.props.user[0],
      roleId: this.props.user[1]
    }; 
    this.closeDialog = this.closeDialog.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.onRoleChange = this.onRoleChange.bind(this);
    this.setNewRole = this.setNewRole.bind(this);
    this.updateRole = this.updateRole.bind(this);
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
   * @param {number} index
   * @param {number} value
   * @memberof EditUserRole
   * @return {void}
   */
  setNewRole(event, index, value) {
    this.setState({
      roleId: value,
      openDialog: true
    });
  }

   /**
   * @param {any} event 
   * @memberof EditRole
   * @returns {void}
   */
  handleTouchTap(event){
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openDialog: true,
      anchorEl: event.currentTarget,
    });
  }

  /**
   * @memberof EditRole
   * @returns {void}
   */
  closeDialog(){
    this.setState({
      openDialog: false,
    });
  }

  /**
   * Creates an instance of EditUserRole.
   * @param {object} event
   * @param {number} index
   * @param {number} value
   * @memberof EditUserRole
   * @return {void}
   */
  updateRole() {
    const userUpdate = {
      id: this.state.userId,
      role: setRoleType(this.state.roleId)
    };
    // console.log(userUpdate);
    this.props.updateUser(userUpdate).then(() => {
      this.setState({openDialog: false});
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
    return (
      <div>
        <DropDownMenu
          className="role-menu"
          value={this.state.roleId}
          onChange={this.setNewRole}
          autoWidth={false}
          style={styles.customWidth}
          disabled={this.state.userId == 1}
        >
          <MenuItem value={1} primaryText="Administrator" />
          <MenuItem value={2} primaryText="Member" />
          <MenuItem value={3} primaryText="Owner" />
          <MenuItem value={4} primaryText="Viewer" />
        </DropDownMenu>
        <ConfirmActionDialog
          open={this.state.openDialog}
          title='Are you sure you want to update user role?'
          cancelText='cancel'
          proceedText='continue'
          buttonStyle={1}
          cancelAction={this.closeDialog}
          proceedAction={this.updateRole}
        />
      </div>
    );
  } 
}

EditRole.propTypes = {
  user: PropTypes.array.isRequired,
  updateUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return{
    roles: state.roles
  }
}
export default connect(mapStateToProps, { getAllRoles, updateUser })(EditRole);

import React from 'react';
import PropTypes from 'prop-types';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDelete from 'material-ui/svg-icons/action/delete';

import ContentClear from 'material-ui/svg-icons/content/clear';

import { blue500 } from 'material-ui/styles/colors';

/**
 * @class EditRole
 * @extends {React.Component}
 */
class EditRole extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showField: false,
    };
    this.editRole = this.editRole.bind(this);    
    this.saveRole = this.saveRole.bind(this);
  }
  
  editRole(event) {
    event.preventDefault();
    this.setState({showField: true});
  }

  saveRole(event) {
    event.preventDefault();
    this.setState({showField: false});
  }

  /**
   * Get content from tinymce editor
   * @memberof EditRole
   * @returns {void}
   */
  render() {
    const td = (this.state.showField === false) ?
    (
      <a href="" onClick={this.editRole} >
        edit
      </a>
    ): (
      <div id="edit">
        <ActionDone viewBox='0 -10 30 30' color={blue500} />
        <ActionDelete viewBox='0 -10 30 30' color={blue500} />        
        <ContentClear
          viewBox='0 -10 30 30'
          color={blue500}
          onClick={this.saveRole}
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
  role: PropTypes.object.isRequired
}
export default EditRole;
import React from 'react';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import Lock from 'material-ui/svg-icons/action/lock';
import Public from 'material-ui/svg-icons/social/public';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import People from 'material-ui/svg-icons/social/people';

// Document access radio buttons
const AccessRadioButtons = ({ onOptionChange }) => (
  <div>
    <RadioButtonGroup
      className="document-access-options"
      name="access"
      defaultSelected="not_light"
      onChange={onOptionChange}
    >
      <RadioButton
        value="private"
        label="Private"
        checkedIcon={<Lock style={{color: '#F44336'}} />}
        uncheckedIcon={<LockOutline />}
      />
      <RadioButton
        value="public"
        label="Public"
        checkedIcon={<Public style={{color: '#F44336'}} />}
        uncheckedIcon={<Public />}
      />
      <RadioButton
        value="role"
        label="Role"
        checkedIcon={<People style={{color: '#F44336'}} />}
        uncheckedIcon={<PeopleOutline />}
      />
    </RadioButtonGroup>
  </div>
);

AccessRadioButtons.propTypes = {
  onOptionChange: PropTypes.func.isRequired
}

export default AccessRadioButtons;
import React from 'react';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import LockOutline from 'material-ui/svg-icons/action/lock-outline';
import Lock from 'material-ui/svg-icons/action/lock';
import Public from 'material-ui/svg-icons/social/public';
import PeopleOutline from 'material-ui/svg-icons/social/people-outline';
import People from 'material-ui/svg-icons/social/people';

/*
  Radio buttons for document access options
*/
const DocumentAccessOptions = ({ access, onOptionChange }) => (
  <div>
    <RadioButtonGroup
      className="document-access-options"
      name="access"
      defaultSelected={access}
      onChange={onOptionChange}
    >
      <RadioButton
        value="private"
        label="Private"
        checkedIcon={<Lock style={{color: '#F44336'}} />}
        uncheckedIcon={<LockOutline viewBox='0 2 40 20' />}
      />
      <RadioButton
        value="public"
        label="Public"
        checkedIcon={<Public style={{color: '#F44336'}} />}
        uncheckedIcon={<Public viewBox='0 2 40 20' />}
      />
      <RadioButton
        value="role"
        label="Role"
        checkedIcon={<People style={{color: '#F44336'}} />}
        uncheckedIcon={<PeopleOutline viewBox='0 2 40 20' />}
      />
    </RadioButtonGroup>
  </div>
);

DocumentAccessOptions.propTypes = {
  access: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired
}

export default DocumentAccessOptions;
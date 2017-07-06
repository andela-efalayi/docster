import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/*
  TextInputField Component
  Displays an input field
*/
const TextInputField = ({ 
  error, type, name, value, placeholder, onInputChange }) => {
  return(
    <div className={classNames("twelve columns", {'error': error})}>
      {error && <span>{error}</span>}
      <input
        className="u-full-width"
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
      />
    </div>
  );
};

TextInputField.propTypes = {
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired
}

TextInputField.defaultProps = {
  error: null
}
export default TextInputField;
import React from 'react';
import PropTypes from 'prop-types';

const SearchForm = ( { onInputChange, searchString, placeholder } ) => {
  return(
    <input 
      type="text" 
      className="u-full-width"
      value={searchString}
      name="searchString"
      placeholder={placeholder} 
      onChange={onInputChange}
    />
  );
};

SearchForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired
}

export default SearchForm;

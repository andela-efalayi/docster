import React from 'react';
import PropTypes from 'prop-types';

/*
  Renders a Search text-input field
*/
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
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchString: PropTypes.string
};

SearchForm.defaultProps = {
  onInputChange: null,
  placeholder: "search",
  searchString: ""
}

export default SearchForm;

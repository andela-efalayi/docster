import React from 'react';
import PropTypes from 'prop-types';
import CreateDocumentDialog from '../dialogs/CreateDocumentDialog.jsx';
import SearchForm from '../forms/SearchForm.jsx';

/**
 * HomeTab Component
 * Displays displays number of user's documents
 * Displays a search field and button for creating documents
 * @param {string} title
 * @param {string} placeholder
 * @param {string} searchString
 * @param {number} numberOfDocuments
 * @param {func} onInputChange
 * @returns {object} react-component
 */
const HomeTab = ({ title, numberOfDocuments, onInputChange,
  placeholder, searchString }) => (
    <div className="home-tab">
      <div className="row">
        <div className="three columns page-title">
          <p className="center">
            <span>{title}</span>
            <span>{numberOfDocuments}</span>
          </p> 
        </div>
        <div className="five columns">
          <SearchForm 
            onInputChange={onInputChange}
            searchString={searchString}
            placeholder={placeholder}
          />
        </div>
        <div className="two columns">
          <CreateDocumentDialog />
        </div>
      </div>
    </div>
  );

HomeTab.propTypes = {
  numberOfDocuments: PropTypes.number,
  onInputChange: PropTypes.func,
  placeholder: PropTypes.string,
  searchString: PropTypes.string,
  title: PropTypes.string.isRequired
}

HomeTab.defaultProps = {
  numberOfDocuments: 0,
  onInputChange: null,
  placeholder: "search",
  searchString: ""
}

export default HomeTab;

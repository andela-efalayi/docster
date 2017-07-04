import React from 'react';
import PropTypes from 'prop-types';
import CreateDocumentDialog from '../dialogs/CreateDocumentDialog.jsx';
import SearchForm from '../forms/SearchForm.jsx';

const HomeTab = ({ numberOfDocuments, onInputChange,
  placeholder, searchString }) => (
    <div className="home-tabs">
      <div className="row">
        <div className="four columns">
          <SearchForm 
            onInputChange={onInputChange}
            searchString={searchString}
            placeholder={placeholder}
          />
        </div>
        <div className="eight columns">
          <div className="four columns document-length">
            <p className="center">My Documents:
              <span>{numberOfDocuments}</span></p>
          </div>
          <div className="four columns">
            <CreateDocumentDialog />
          </div>
        </div>
      </div>
    </div>
  );

HomeTab.propTypes = {
  numberOfDocuments: PropTypes.number.isRequired,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired
}
export default HomeTab;

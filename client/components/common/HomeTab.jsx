import React from 'react';
import PropTypes from 'prop-types';
import CreateDocumentDialog from '../dialogs/CreateDocumentDialog.jsx';
import SearchForm from '../forms/SearchForm.jsx';

const HomeTabs = ({ numberOfDocuments }) => (
  <div className="home-tabs">
    <div className="row">
      <div className="five columns">
        <div className="five columns document-length">
          <p>No of Documents: <span>{numberOfDocuments}</span></p>
        </div>
        <div className="seven columns">
          <CreateDocumentDialog />
        </div>
      </div>
      <div className="search-form seven columns">
        <SearchForm />
      </div>
    </div>
  </div>
);

HomeTabs.propTypes = {
  numberOfDocuments: PropTypes.number.isRequired
}
export default HomeTabs;

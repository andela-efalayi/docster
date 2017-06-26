import React from 'react';
import PropTypes from 'prop-types';
import DocumentAccessOptions from '../common/DocumentAccessOptions.jsx';

const DocumentForm = ({ onInputChange }) => (
  <form action="">
    <div className="row">
      <div className="twelve columns">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          className="u-full-width"
          name="title"
          placeholder="Enter title"
          onChange={onInputChange}
        />
      </div>
      <div className="twelve columns">
        <label htmlFor="content">Content</label>
        <textarea 
          className="u-full-width"
          name="content"
          placeholder="Enter content"
          onChange={onInputChange}
        />
      </div>
      <div className="document-access">
        <h6>Access</h6>
        <DocumentAccessOptions onOptionChange={onInputChange} />
      </div>
    </div>
  </form>
);

DocumentForm.propTypes = {
  onInputChange: PropTypes.func.isRequired
}

export default DocumentForm;

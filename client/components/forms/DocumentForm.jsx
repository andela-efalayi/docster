import React from 'react';
import PropTypes from 'prop-types';
import AccessRadioButtons from '../common/AccessRadioButtons.jsx';

const DocumentForm = ({ document, onInputChange }) => (
  <form action="">
    <div className="row">
      <div className="twelve columns">
        <label htmlFor="title">Title</label>
        <input 
          type="text" 
          className="u-full-width"
          name="title"
          value={document.title || ""}
          placeholder="Enter title"
          onChange={onInputChange}
        />
      </div>
      <div className="twelve columns">
        <label htmlFor="content">Content</label>
        <textarea 
          className="u-full-width"
          name="content"
          value={document.content || ""}
          placeholder="Enter content"
          onChange={onInputChange}
        />
      </div>
      <div className="document-access">
        <h6>Access</h6>
        <AccessRadioButtons onOptionChange={onInputChange} />
      </div>
    </div>
  </form>
);

DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired
}

export default DocumentForm;

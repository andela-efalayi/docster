import React from 'react';
import PropTypes from 'prop-types';
import AccessRadioButtons from '../common/AccessRadioButtons.jsx';
import TextInputField from '../common/TextInputField.jsx';
import Tinymce from './Tinymce.jsx';

/*
  Document Form
  Renders a form for creating a document.
*/
const DocumentForm = ({ document, onInputChange, onEditorChange }) => (
  <form action="">
    <div className="row">
      <div className="twelve columns">
        <label htmlFor="title">Title</label>
        <TextInputField
          type="text"
          name="title"
          value={document.title || ""}
          placeholder="Enter title"
          onInputChange={onInputChange}
        />
      </div>
      <div className="twelve columns">
        <label htmlFor="content">Content</label>
        <Tinymce
          id="content"
          value={document.content || ""}
          onEditorChange={onEditorChange}
        />
      </div>
      <div className="document-access">
        <h6>Access</h6>
        <AccessRadioButtons
          access={document.access}
          onOptionChange={onInputChange}
        />
      </div>
    </div>
  </form>
);

DocumentForm.propTypes = {
  document: PropTypes.object.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onEditorChange: PropTypes.func.isRequired
}

export default DocumentForm;

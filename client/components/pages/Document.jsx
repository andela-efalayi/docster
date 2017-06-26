import React from 'react';
import PropTypes from 'prop-types';
import EditDocumentDialog from '../dialogs/EditDocumentDialog.jsx';
import DeleteDcoumentAlert from '../dialogs/DeleteDocumentAlert.jsx';

const Document = ({ document }) => (
  <div className="document">
    <div className="document-details">
      <div className="row">
        <div className="ten columns">
          <h5>{document.title}</h5>
        </div>
        <div className="two columns">
          <span className="document-id">{`#${document.id}`}</span>
        </div>
      </div>
    </div>
    <div className="document-content">
      <p>
        {document.content}
      </p>
      <div>
        <DeleteDcoumentAlert document={document} />
        <EditDocumentDialog document={document} />
      </div>
    </div>
  </div>
);

Document.propTypes = {
  document: PropTypes.object.isRequired
}

export default Document;

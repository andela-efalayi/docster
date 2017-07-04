import React from 'react';
import PropTypes from 'prop-types';
import EditDocumentDialog from '../dialogs/EditDocumentDialog.jsx';
import DeleteDcoumentAlert from '../dialogs/DeleteDocumentAlert.jsx';
import AccessIcon from '../common/AccessIcon.jsx';
import SetMaxCharacters from '../../utils/SetMaxCharacters';

const Document = ({ document }) => {
  const title = SetMaxCharacters(`${document.title}`, 20, '...');
  const content = SetMaxCharacters(`${document.content}`, 280, '...');
  return(
    <div className="document">
      <div className="document-details">
        <div className="row">
          <div className="ten columns">
            <h5>{title}</h5>
          </div>
          <div className="two columns">
            <AccessIcon accessType={document.access} />
          </div>
        </div>
      </div>
      <div className="document-content">
        <p>
          {content}
        </p>
        <div className="row">
          <div className="two columns">
            <DeleteDcoumentAlert document={document} />
          </div>
          <div className="two columns">
            <EditDocumentDialog document={document} />
          </div>
        </div>
      </div>
    </div>
  );
};

Document.propTypes = {
  document: PropTypes.object.isRequired
}

export default Document;

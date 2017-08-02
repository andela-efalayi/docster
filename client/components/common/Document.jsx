import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';
import EditDocumentDialog from '../dialogs/EditDocumentDialog.jsx';
import DeleteDocumentAlert from '../dialogs/DeleteDocumentAlert.jsx';
import AccessIcon from '../common/AccessIcon.jsx';
import SetMaxCharacters from '../../utils/SetMaxCharacters';

/**
 * Document component 
 * Displays a single document
 * @param {object} document
 * @param {number} userId
 */

const Document = ({ document, userId }) => {
  const title = SetMaxCharacters(`${document.title}`, 27, '...');
  const content = SetMaxCharacters(`${document.content}`, 170, '...');
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
        <div className="text">
          {Parser(content)}
        </div>
        <div className="row actions">
          {
            userId === document.userId &&
            <div>
              <div className="two columns">
                <DeleteDocumentAlert document={document} />
              </div>
              <div className="two columns">
                <EditDocumentDialog document={document} />
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

Document.propTypes = {
  document: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
}

export default Document;

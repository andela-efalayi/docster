import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import Document from './Document.jsx';

/*
  Documents Component
  Orders all documents in an array
*/
const Documents = (props) => {
    const orderedDocuments = orderBy(
      props.documents, ['createdAt'], ['desc'])
    return(
      <div>
        {orderedDocuments.map(document => (
          <div className="three columns" key={document.id}>
            <Document document={document} userId={props.userId} />
          </div>
        ))}
      </div>
    );
};

Documents.propTypes = {
  documents: PropTypes.array.isRequired,
  userId: PropTypes.number.isRequired
}

export default Documents;

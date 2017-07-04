import React from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import Document from './Document.jsx';

const Documents = (props) => {
    const orderedDocuments = orderBy(
      props.documents, ['createdAt'], ['desc'])
    return(
      <div>
        {orderedDocuments.map(document => (
          <div className="three columns" key={document.id}>
            <Document document={document} />
          </div>
        ))}
      </div>
    );
};

Documents.propTypes = {
  documents: PropTypes.array.isRequired
}

export default Documents;

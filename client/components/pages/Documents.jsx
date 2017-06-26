import React, { Component } from 'react';
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import Document from './Document.jsx';

/**
 * @class Documents
 * @extends {Component}
 */
class Documents extends Component {

  /**
   * Creates an instance of Documents.
   * @param {any} props 
   * @memberof Documents
   */
  constructor(props) {
    super(props);

  }

  /**
   * @memberof Documents
   * @returns {object} react-component
   */
  render() {
    const orderedDocuments = orderBy(
      this.props.documents, ['createdAt'], ['desc'])
    return(
      <div>
        {orderedDocuments.map(document => (
          <div className="three columns" key={document.id}>
            <Document document={document} />
          </div>
        ))}
      </div>
    );
  }
}

Documents.propTypes = {
  documents: PropTypes.array.isRequired
}

export default Documents;

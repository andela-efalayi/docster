import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} document 
 * @returns {object} action
 */
export function updateDocumentSuccess(document){
  return {
    type: ActionTypes.UPDATE_DOCUMENT,
    document
  }
}

/**
 * Update a document
 * @param {object} document 
 * @returns {func} dispatch
 */
export function updateDocument(document) {
  return function(dispatch) {
    return axios.put(`/documents/${document.id}`, document)
      .then(response => {
        const updatedDocument = response.data.documentWithUpdate
        dispatch(updateDocumentSuccess(updatedDocument));
      })
      .catch(error => {
        throw(error);
      });
  }
}
import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';


/**
 * Delete Document
 * @param {object} document 
 * @returns {object} action
 */
export function deleteDocumentSuccess(document) {
  return {
    type: ActionTypes.DELETE_DOCUMENT,
    document
  }
}


/**
 * @param {any} document 
 * @returns {func} dispatch
 */
export function deleteDocument(document){
  return function(dispatch) {
    return axios.delete(`/documents/${document.id}`)
      .then(() => {
        dispatch(deleteDocumentSuccess(document));
      })
      .catch(error => {
        throw(error);
      });
  }
}
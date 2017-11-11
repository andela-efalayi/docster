import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import showToast from '../utils/ShowToast';
import getServerError from '../utils/GetServerError';

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
    return axios.put(`/api/v1/documents/${document.id}`, document)
      .then(response => {
        const updatedDocument = response.data.documentWithUpdate
        dispatch(updateDocumentSuccess(updatedDocument));
        showToast(response.data.message, 'success');
      })
      .catch(error => {
        const serverError = getServerError(error);
        throw(serverError);
      });
  }
}
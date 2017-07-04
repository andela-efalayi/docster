import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {object} documents
 * @returns {object} action
 */
export function getPublicDocumentsSuccess(documents) {
  return {
    type: ActionTypes.GET_PUBLIC_DOCUMENTS,
    documents
  }
}

/**
 * @param {number} userId 
 * @returns {func} dispatch
 */
export function getPublicDocuments() {
  return function(dispatch) {
    return axios.get(`/public-documents`)
      .then(response => {
        dispatch(getPublicDocumentsSuccess(response.data.documents));
      })
      .catch(error => {
        throw(error);
      });
  }
}
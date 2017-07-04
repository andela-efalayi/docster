import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @param {any} documents 
 * @returns {object} action
 */
export function searchDocumentSuccess(documents) {
  return {
    type: ActionTypes.SEARCH_ALL_DOCUMENTS,
    documents
  }
}

/**
 * @param {any} searchString 
 * @returns {func} dispatch
 */
export function searchDocument(searchString) {
  return function(dispatch) {
    return axios.get(`/search/documents`, {
      params: {
        q: searchString
      }
    })
      .then(response => {
        const documents = response.data.documents
        dispatch(searchDocumentSuccess(documents));
      })
      .catch(error => {
        throw(error);
      });
  }
}
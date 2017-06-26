import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';

/**
 * @export
 * @param {any} document 
 * @returns {object} action
 */
export function createDocumentSuccess(document) {
  return {
    type: ActionTypes.CREATE_DOCUMENT,
    document
  }
}

/**
 * @param {object} newDocument 
 * @returns {func} dispatch
 */
export function createDocument(newDocument) {
  return function(dispatch) {
    return axios.post('/documents', newDocument)
      .then(response => {
        dispatch(createDocumentSuccess(response.data.newDocument));
      })
      .catch(error => {
        throw(error.data);
      });
  }
}

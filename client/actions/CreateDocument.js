import axios from 'axios';
import ActionTypes from '../../constants/ActionTypes';
import getServerError from '../utils/GetServerError';

/**
 * Create document in database
 * @param {object} document 
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
    return axios.post('/api/v1/documents', newDocument)
      .then(response => {
        dispatch(createDocumentSuccess(response.data.newDocument));
      })
      .catch(error => {
        const serverError = getServerError(error).data;
        if(serverError){
          throw(serverError.message);
        }
        throw(error);
      });
  }
}

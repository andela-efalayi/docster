import ActionTypes from '../../constants/ActionTypes';
import InitialState from '../reducers/InitialState';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function DocumentReducer(state=InitialState.documents, action) {
  switch(action.type) {
    case ActionTypes.CREATE_DOCUMENT:
      return [
        ...state,
        Object.assign({}, action.document)
      ];
    case ActionTypes.LOAD_USER_DOCUMENTS:
      return action.documents;
    default:
      return state;
  }
}
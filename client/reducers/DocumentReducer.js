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
    case ActionTypes.DELETE_DOCUMENT:
      return state.filter(document => document.id !== action.document.id);
    case ActionTypes.GET_PUBLIC_DOCUMENTS:
    case ActionTypes.GET_ROLE_DOCUMENTS:
    case ActionTypes.GET_USER_DOCUMENTS:
      return action.documents;
    case ActionTypes.UPDATE_DOCUMENT:
      return [
        ...state.filter(document => document.id !== action.document.id),
        Object.assign({}, action.document)
      ];
    default:
      return state;
  }
}
import ActionTypes from '../../constants/ActionTypes';
import InitialState from '../reducers/InitialState';

/**
 * @param {array} state
 * @param {object} action 
 * @returns {array} state
 */
export default function DocumentReducer(state=InitialState.documents, action) {
  let update = {};
  switch(action.type) {
    case ActionTypes.CREATE_DOCUMENT:
      update.count = state.count;    
      update.rows = [...state.rows, Object.assign({}, action.document)];
      return Object.assign({},
        ...state,
        {rows: update.rows},
        {count: update.count + 1}
      );
    case ActionTypes.DELETE_DOCUMENT:
      update.count = state.count;    
      update.rows = [...state.rows.filter(
        document => document.id !== action.document.id)];
      return Object.assign({},
        ...state,
        {rows: update.rows},
        {count: update.count - 1}
      );
    case ActionTypes.GET_PUBLIC_DOCUMENTS:
    case ActionTypes.GET_ROLE_DOCUMENTS:
    case ActionTypes.GET_USER_DOCUMENTS:
      return action.documents;
    case ActionTypes.UPDATE_DOCUMENT:
      update.count = state.count;    
      update.rows = [...state.rows.filter(
        document => document.id !== action.document.id),
        Object.assign({}, action.document)];
      return Object.assign({},
        ...state,
        {rows: update.rows},
        {count: update.count}
      );
    default:
      return state;
  }
}
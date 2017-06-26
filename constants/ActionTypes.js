import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  CREATE_NEW_USER_SUCCESS: null,
  CREATE_DOCUMENT: null,
  SET_CURRENT_USER: null,
  GET_USER_DETAILS: null,
  LOAD_USER_DOCUMENTS: null
});

export default ActionTypes;

import thunk from 'redux-thunk';
import moxios from  'moxios';
import reduxStore from 'redux-mock-store';
import * as action from '../../actions/UpdateDocument';
import ActionTypes from '../../../constants/ActionTypes';
import { publicDocument, updatedDocument } from '../../__mocks__/mockData'

const configureMockStore = reduxStore([thunk]);

describe('UpdateDocument.js', () =>{
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should update a document when updateDocument function is called', () => {
    moxios.stubRequest(`/api/v1/documents/${publicDocument.id}`, {
      status: 200,
      response: {
        documentWithUpdate: updatedDocument,
        message: "Document updated"
      }
    });
    const expectedAction = [{
      document: updatedDocument,      
      type: ActionTypes.UPDATE_DOCUMENT,
    }];
    const store = configureMockStore();
    return store.dispatch(action.updateDocument(publicDocument))
    .then(() => { 
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

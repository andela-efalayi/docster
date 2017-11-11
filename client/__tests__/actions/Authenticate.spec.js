
import thunk from 'redux-thunk';
import moxios from  'moxios';
import reduxStore from 'redux-mock-store';
import * as Authenticate from '../../actions/Authenticate';
import ActionTypes from '../../../constants/ActionTypes';
import { currentUser, token, dummyUser } from '../../__mocks__/mockData'

const configureMockStore = reduxStore([thunk]);

describe('Authenticate.js', () =>{
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });
  it('should log user into application', () => {
    moxios.stubRequest('/api/v1/users/login', {
      status: 200,
      response: {
        token
      }
    });
    const expectedAction = [{
      currentUser,    
      type: ActionTypes.SET_CURRENT_USER,
    }];
    const store = configureMockStore({});
    return store.dispatch(Authenticate.loginUser(dummyUser))
    .then(() => { 
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
  it('should log user out of application', () => {
    const expectedAction = [{
      currentUser: {},      
      type: ActionTypes.SET_CURRENT_USER,
    }];
    const store = configureMockStore();
    store.dispatch(Authenticate.logoutUser());
    expect(store.getActions()).toEqual(expectedAction);
  });
});

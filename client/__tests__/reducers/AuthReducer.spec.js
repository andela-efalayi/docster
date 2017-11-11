import AuthReducer from '../../reducers/AuthReducer';
import { authAction, defaultAction } from '../../__mocks__/mockData';

describe('AuthReducer.js', () => {
  const initialState = {};
  it('should set currentUser', () => {
    const auth = AuthReducer(initialState, authAction);
    expect(auth.isAuthenticated).toBeDefined();
    expect(auth.currentUser).toEqual(authAction.currentUser);
  });
  it('should return initialState if no action is specified', () => {
    const auth = AuthReducer(initialState, defaultAction);
    expect(auth).toEqual(initialState);
  });
});
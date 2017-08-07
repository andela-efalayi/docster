import RoleReducer from '../../reducers/RoleReducer';
import { getRolesAction, defaultAction } from '../../__mocks__/mockData';

describe('UserReducer.js', () => {
  const initialState = {};
  it('should return roles', () => {
    const roles = RoleReducer(initialState, getRolesAction);
    expect(roles.count).toBeDefined();
    expect(roles.rows).toBeDefined();
    expect(roles.rows.length).toEqual(getRolesAction.roles.rows.length);
  });
  it('should return initialState if no action is specified', () => {
    const roles = RoleReducer(initialState, defaultAction);
    expect(roles).toEqual(initialState);
  });
});
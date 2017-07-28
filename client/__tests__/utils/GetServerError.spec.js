import getServerError from '../../utils/GetServerError';
import { error } from '../../__mocks__/mockData';

describe('GetServerError.js', () => {
  it('should return response value of error object', () => {
    expect(getServerError(error)).toEqual(error.response);
  });
});

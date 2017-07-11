/**
 * Mock functions for axios requests
 * @return {object} promise
 */
import { currentUser, token, successMessage } from './mockData';

export const mockLogin = {
  post() {
    return Promise.resolve({
      data: {
        currentUser,
        token,
        successMessage
      }
    });
  }
};


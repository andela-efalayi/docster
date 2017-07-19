import React from 'react';
import { shallow } from 'enzyme';
import { currentUser } from '../../__mocks__/mockData';
import HeaderItems from '../../components/common/HeaderItems.jsx';

describe('HeaderItems.jsx', () => {
  const logoutUser = jest.fn();
  const headerItems = shallow(
    <HeaderItems
      currentUser={currentUser}
      logoutUser={logoutUser}
    />
  );
  it('should render header items', () => {
    expect(headerItems.find('.header-items')).toHaveLength(1);
  });
});
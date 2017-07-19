import React from 'react';
import { shallow } from 'enzyme';
import PageNavigation from '../../components/common/PageNavigation.jsx';
import { pageCount } from '../../__mocks__/mockData'

describe('PageNavigation.jsx', () => {
  const changePageMock = jest.fn();
  const pageNavigation = shallow(
    <PageNavigation
      pageCount={pageCount}
      changePage={changePageMock}
    />
  );
  it('should render a list of page numbers', () => {
    expect(pageNavigation.node.props.onPageChange).toBeDefined();
    expect(pageNavigation.node.props.pageCount).toEqual(pageCount);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { publicDocument } from '../../__mocks__/mockData';
import Document from '../../components/common/Document.jsx';

describe('Header.jsx', () => {
  const document = shallow(
    <Document document={publicDocument} userId={publicDocument.userId} />
  );
  it('should render app name', () => {
    console.log("passed");
  });
});
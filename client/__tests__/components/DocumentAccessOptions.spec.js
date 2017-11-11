import React from 'react';
import { shallow } from 'enzyme';
import DocumentAccessOptions from '../../components/common/DocumentAccessOptions.jsx';

describe('AccessRadioButton.jsx', () => {
  const onOptiontChangeMock = jest.fn();
  it('should display a radiobutton', () => {
    const documentAccessOptions = shallow(
      <DocumentAccessOptions
        access='role'
        onOptionChange={onOptiontChangeMock}
      />
    );
    expect(documentAccessOptions
      .find('.document-access-options')).toHaveLength(1);
    expect(documentAccessOptions
      .find('.document-access-options').node.props.defaultSelected)
      .toEqual('role');
  });
});
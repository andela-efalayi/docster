import React from 'react';
import { shallow } from 'enzyme';
import Tinymce from '../../components/forms/Tinymce.jsx';
import { publicDocument } from '../../__mocks__/mockData';

describe('Tinymce.jsx', () => {
  const onEditorChangeMock = jest.fn();
  const tinyMce = shallow(
    <Tinymce
      id="content"
      value={publicDocument.content}
      onEditorChange={onEditorChangeMock}
    />
  );
  it('should render tinymce richtext editor', () => {
    expect(tinyMce.node.props.defaultValue).toEqual(publicDocument.content);
  });
});

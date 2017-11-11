import React from 'react';
import { shallow } from 'enzyme';
import { publicDocument } from '../../__mocks__/mockData';
import DocumentForm from '../../components/forms/DocumentForm.jsx';

describe('DocumentForm.jsx', () => {
  const onInputChange = jest.fn();
  const onEditorChange = jest.fn();
  const editorContent = {
    ops: []
  }

  const documentForm = shallow(
    <DocumentForm
      document={publicDocument}
      onInputChange={onInputChange}
      onEditorChange={onEditorChange}
      editorContent={editorContent}
    />
  );
  it('should render a form for creating and editing a document', () => {
    expect(documentForm.find('form')).toHaveLength(1);
    expect(documentForm.find('.twelve.columns').nodes[0]
    .props.children[0].type).toEqual('label');
    expect(documentForm.find('.twelve.columns')
    .nodes[0].props.children[1].type.propTypes).toBeDefined();
  });
});
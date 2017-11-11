import React from 'react';
import { shallow } from 'enzyme';

import { DeleteDocumentAlert }
from '../../../components/dialogs/DeleteDocumentAlert.jsx';
import { publicDocument } from '../../../__mocks__/mockData';

describe('DeleteDocumentAlert.jsx', () => {
  let props;
  beforeEach(() => {
    props = {
      deleteDocument: jest.fn(() => new Promise(() => {}))
    };
  });
  const deleteDocumentAlert = 
  shallow(<DeleteDocumentAlert document={publicDocument} {...props} />);
  const openDialogMock = jest.fn(() => {
    deleteDocumentAlert.setState({
      open: true
    });
  });
  it('should render a button which opens a modal when clicked', () => {
    expect(deleteDocumentAlert.find('.open-delete-dialog').length).toEqual(1);
    deleteDocumentAlert.find('.open-delete-dialog')
    .simulate('click', openDialogMock());
    expect(openDialogMock).toHaveBeenCalled();
  });
});
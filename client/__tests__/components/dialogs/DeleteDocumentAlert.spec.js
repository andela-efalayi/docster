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
  it('should run', () => {
    // console.log(deleteDocumentAlert.find('label'));
  });
});
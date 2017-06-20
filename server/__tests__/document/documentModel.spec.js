import chai from 'chai';
import colors from 'colors';

import Models from '../../models';
import testData from '../fakerData/model-data';

const expect = chai.expect;
const assert = chai.assert;
const User = Models.User;
const Document = Models.Document;
const newUser = testData.appUser;
const newDocument = testData.newDocument;
newDocument.slug = newDocument.title;

let currentUser;
let createdDocument;

process.env.NODE_ENV = 'test';

describe(colors.green('DocumentModel'), () => {
  before((done) => {
    User.create(newUser)
    .then((user) => {
      currentUser = user.dataValues;
      newDocument.userId = currentUser.id;
      done();
    });
  });

  describe(colors.underline('Create function'), () => {
    it('should create a document with complete fields', (done) => {
      Document.create(newDocument)
      .then((document) => {
        createdDocument = document.dataValues;
        assert.exists(document);
      });
      done();
    });
    describe(colors.underline('Created document'), () => {
      it('should have a title', () => {
        expect(createdDocument.title).to.be.a('string');
      });
      it('should have a title slug', () => {
        const titleSlug = createdDocument.title.replace(/[" "]/g, '-');
        expect(createdDocument.slug).to.be.a('string');
        expect(createdDocument.slug).to.equal(titleSlug);
      });
      it('should have the correct userId', () => {
        assert.exists(createdDocument.userId);
        expect(createdDocument.userId).to.equal(currentUser.id);
      });
    });
    it('should require a title field to create a document', (done) => {
      Document.create(testData.newDocumentWithoutTitle)
      .catch((error) => {
        expect(/notNull Violation: title cannot be null/.test(error.message)).to.equal(true);
        done();
      });
    });
  });
});

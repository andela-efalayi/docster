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

/*
  Test Document Model
*/
describe(colors.green('DocumentModel'), () => {
  // Create a user before test
  before((done) => {
    User.create(newUser)
    .then((user) => {
      currentUser = user.dataValues;
      newDocument.userId = currentUser.id;
      done();
    });
  });

  describe(colors.underline('Create function'), () => {
    it('should fail if no title is provided', (done) => {
        Document.create(testData.newDocumentWithoutTitle)
        .catch((error) => {
          expect(/notNull Violation: title cannot be null/
          .test(error.message)).to.equal(true);
          done();
        });
      });
    it('should create a document', (done) => {
      Document.create(newDocument)
      .then((document) => {
        createdDocument = document.dataValues;
        assert.exists(document);
        expect(document).to.be.an('object');
        done();        
      });
    });

    describe(colors.underline('Created document'), () => {
      it('should have a title', (done) => {
        expect(createdDocument.title).to.be.a('string');
        done();
      });
      it('should have a title slug', (done) => {
        const titleSlug = createdDocument.title.replace(/[" "]/g, '-');
        expect(createdDocument.slug).to.be.a('string');
        expect(createdDocument.slug).to.equal(titleSlug);
        done();
      });
      it('should have the correct userId', (done) => {
        assert.exists(createdDocument.userId);
        expect(createdDocument.userId).to.equal(currentUser.id);
        done();
      });
    });
  });
});

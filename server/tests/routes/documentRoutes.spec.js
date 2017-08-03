import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import { decodeToken } from '../../auth/token';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
const assert = chai.assert;
const documentOwner = serverData.documentOwner;
const newDocument = serverData.newPublicDocument;
const adminToken = serverData.adminToken;

let createdDocument;
let createdUser;
let serverResponse;

chai.use(chaiHttp);

/*
  Test Document Routes
*/
describe(colors.green('DocumentRoutes'), () => {
  // Create a user before test
  before((done) => {
    chai.request(server)
    .post('/api/v1/users')
    .send(documentOwner)
    .end((err, res) => {
      serverResponse = res.body;
      createdUser = decodeToken(serverResponse.token);
      newDocument.userId = createdUser.id;
      done();
    });
  });

  describe(colors.underline('CreateDocument function'), () => {
    it('should return an error if no details are provided', (done) => {
      chai.request(server)
      .post('/api/v1/documents')
      .send({})
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('No document data provided');
        done();
      });
    });
    it('should return an error if document has no title', (done) => {
      chai.request(server)
      .post('/api/v1/documents')
      .send(serverData.documentWithNoTitle)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Document must have a title');
        done();
      });
    });
    it('should create a new document in database', (done) => {
      chai.request(server)
      .post('/api/v1/documents')
      .send(newDocument)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        createdDocument = res.body.newDocument;
        expect(res.status).to.equal(201);
        expect(res.body.newDocument.userId).to.equal(createdUser.id);
        done();
      });
    });
  });

  describe(colors.underline('GetAllDocuments function'), () => {
    it('should return an error if user is not an admin', (done) => {
      chai.request(server)
      .get('/api/v1/documents')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User is not an admin');
        done();
      });
    });
    it('should get all documents if user is an admin', (done) => {
      chai.request(server)
      .get('/api/v1/documents')
      .set('Authorisation', 'Bearer '+adminToken)
      .end((err, res) => {
        assert.isDefined(res.body.pageMetaData);
        assert.isDefined(res.body.documents.rows);        
        done();
      });
    });
  });

  describe(colors.underline('GetPublicDocuments function'), () => {
    it('should return all public documents', (done) => {
      chai.request(server)
      .get('/api/v1/public-documents')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents).to.have.all.keys('count', 'rows');
        done();
      });
    });
  });

  describe(colors.underline('GetRoleDocuments function'), () => {
    it('should return all role documents', (done) => {
      chai.request(server)
      .get('/api/v1/role-documents')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200)
        expect(res.body.message).to.be.a('string');
        done();
      });
    });
  });

  describe(colors.underline('GetDocumentById function'),
  () => {
    it('should return an error if documentId is not an number', (done) => {
      chai.request(server)
      .get('/api/v1/documents/esther')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Id must be numeric');
        done();
      });
    });
    it('should return an error if document does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/documents/-1')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Id must be greater than zero');
        done();
      });
    });
    it('should get document with specified id', (done) => {
      chai.request(server)
      .get(`/api/v1/documents/${createdDocument.id}`)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.document.id).to.equal(createdDocument.id);
        done();
      });
    });
  });

  describe(colors.underline('UpdateDocument function'),
  () => {
    it('should return an error if document does not exist', (done) => {
      chai.request(server)
      .put('/api/v1/documents/-1')
      .send({ content: 'content for an invalid document id' })
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.body.message).to.equal('Id must be greater than zero')
        done();
      });
    });
    it('should update a document with the specified id', (done) => {
      chai.request(server)
      .put(`/api/v1/documents/${createdDocument.id}`)
      .send({title: serverData.newDocumentTitle})
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to
        .equal('Document updated');
        done();
      });
    });
  });

  describe(colors.underline('DeleteDocument function'), () => {
    it('should return an error if document does not exist', (done) => {
      chai.request(server)
      .delete('/api/v1/documents/-1')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Id must be greater than zero');
        done();
      });
    });
    it('should delete a user with the specified id', (done) => {
      chai.request(server)
      .delete(`/api/v1/documents/${createdDocument.id}`)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Document deleted');
        done();
      });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
const assert = chai.assert;
const documentOwner = serverData.documentOwner;
const newDocument = serverData.newPublicDocument;

let createdDocument;
let createdUser;
let serverResponse;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

/*
  Test Document Routes
*/
describe(colors.green('DocumentRoutes'), () => {
  // Create a user before test
  before((done) => {
    chai.request(server)
    .post('/docster/api/v1/users')
    .send(documentOwner)
    .end((err, res) => {
      serverResponse = res.body;
      createdUser = serverResponse.user;
      newDocument.userId = createdUser.id;
      done();
    });
  });

  // Test that route creates a document with the correct userId
  describe(colors.underline('POST /docster/api/v1/document'), () => {
    it('should create a new document in database with userId', (done) => {
      chai.request(server)
      .post('/docster/api/v1/documents')
      .send(newDocument)
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        createdDocument = res.body.newDocument;
        expect(res.status).to.equal(200);
        expect(res.body.newDocument.userId).to.equal(createdUser.id);
        done();
      });
    });

    // Test that route does not create a document twice
    it('should not create a document twice', (done) => {
      chai.request(server)
      .post('/docster/api/v1/documents')
      .send(newDocument)
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to
        .equal('An error occurred while creating document');
        done();
      });
    });
  });

  // Test that route returns an error if request is not from an admin
  describe(colors.underline('GET /docster/api/v1/documents'), () => {
    it('should return an error if user is not an admin', (done) => {
      chai.request(server)
      .get('/docster/api/v1/documents')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User is not a docster app admin');
        done();
      });
    });
  });

  // Test that route gets public documents
  describe(colors.underline('GET /docster/api/v1/public-documents'), () => {
    it('should return all public documents', (done) => {
      chai.request(server)
      .get('/docster/api/v1/public-documents')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        assert.isDefined(res.body.documents);
        expect(res.body.documents).to.have.all.keys('count', 'rows');
        done();
      });
    });
  });

  // Test that route gets role documents  
  describe(colors.underline('GET /docster/api/v1/role-documents'), () => {
    it('should return all role documents', (done) => {
      chai.request(server)
      .get('/docster/api/v1/role-documents')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        assert.isDefined(res.body.documents);
        expect(res.body.documents).to.have.all.keys('count', 'rows');
        done();
      });
    });
  });

  //  Test that route can get documents by id
  describe(colors.underline('GET /docster/api/v1/documents/:documentId'),
  () => {
    it('should get all documents from the database', (done) => {
      chai.request(server)
      .get(`/docster/api/v1/documents/${createdDocument.id}`)
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.document.id).to.equal(createdDocument.id);
        done();
      });
    });
    it('should send an error if documentId does not exist', (done) => {
      chai.request(server)
      .get('/docster/api/v1/documents/-1')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
    it('should send an error if documentId is not an number', (done) => {
      chai.request(server)
      .get('/docster/api/v1/documents/esther')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid parameter detected');
        done();
      });
    });
  });

  //  Test that a particular document can be edited
  describe(colors.underline('PUT /docster/api/v1/documents/:documentId'),
  () => {
    it('should update a document with the id specified', (done) => {
      const content = serverData.newDocumentContent;
      chai.request(server)
      .put(`/docster/api/v1/documents/${createdDocument.id}`)
      .send({ content })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to
        .equal(`Document: ${createdDocument.title} was updated successfully`);
        done();
      });
    });
    it('should give an error if document does not exist', (done) => {
      chai.request(server)
      .put('/docster/api/v1/documents/-1')
      .send({ content: 'content for an invalid document id' })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
     it('should give an error for an invalid document id', (done) => {
      chai.request(server)
      .put('/docster/api/v1/documents/esther')
      .send({ content: 'content for an invalid document id' })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
  });

  //  Test that a particular document can be deleted
  describe(colors.underline('DELETE /documents/:documentId'), () => {
    it('should delete a user with the id specified', (done) => {
      chai.request(server)
      .delete(`/docster/api/v1/documents/${createdDocument.id}`)
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Document was deleted successfully');
        done();
      });
    });
    it('should give an error if document does not exist', (done) => {
      chai.request(server)
      .delete('/docster/api/v1/documents/-1')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
    it('should give an error for invalid document Id ', (done) => {
      chai.request(server)
      .delete('/docster/api/v1/documents/esther')
      .set('authorisation', 'Bearer '+serverResponse.token)      
      .end((err, res) => {
        expect(res.status).to.equal(400);        
        done();
      });
    });
  });
});

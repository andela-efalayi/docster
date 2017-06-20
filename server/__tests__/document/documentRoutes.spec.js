import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
const documentOwner = serverData.documentOwner;
const newDocument = serverData.newPublicDocument;

let createdDocument;
let createdUser;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe(colors.green('DocumentRoutes'), () => {
  before((done) => {
    chai.request(server)
    .post('/users')
    .send(documentOwner)
    .end((err, res) => {
      createdUser = res.body.user;
      newDocument.userId = createdUser.id;
      done();
    });
  });
  describe(colors.underline('POST /document'), () => {
    it('should create a new document in database with userId', (done) => {
      chai.request(server)
      .post('/documents')
      .send(newDocument)
      .end((err, res) => {
        createdDocument = res.body.newDocument;
        expect(res.status).to.equal(200);
        expect(res.body.newDocument.userId).to.equal(createdUser.id);
        done();
      });
    });
    it('should not create a document twice', (done) => {
      chai.request(server)
      .post('/documents')
      .send(newDocument)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('An error occurred while creating document');
        done();
      });
    });
  });
  describe(colors.underline('GET /documents/:documentId'), () => {
    it('should get all documents from the database', (done) => {
      chai.request(server)
      .get(`/documents/${createdDocument.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.document.id).to.equal(createdDocument.id);
        done();
      });
    });
    it('should send an error if documentId does not exist', (done) => {
      chai.request(server)
      .get('/documents/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
    it('should send an error if documentId is not an number', (done) => {
      chai.request(server)
      .get('/documents/esther')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Invalid parameter detected');
        done();
      });
    });
  });
  describe(colors.underline('PUT /documents/:documentId'), () => {
    it('should update a document with the id specified', (done) => {
      const content = serverData.newDocumentContent;
      chai.request(server)
      .put(`/documents/${createdDocument.id}`)
      .send({ content })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal(`Document: ${createdDocument.title} was updated successfully`);
        done();
      });
    });
    it('should give an error if document does not exist', (done) => {
      chai.request(server)
      .put('/documents/-1')
      .send({ content: 'content for an invalid document id' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
  });
  describe(colors.underline('DELETE /documents/:documentId'), () => {
    it('should delete a user with the id specified', (done) => {
      chai.request(server)
      .delete(`/documents/${createdDocument.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Document was deleted successfully');
        done();
      });
    });
    it('should give an error if document does not exist', (done) => {
      chai.request(server)
      .delete('/documents/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('Document not found');
        done();
      });
    });
  });
});

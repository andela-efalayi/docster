import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import server from '../../server';
import serverData from '../fakerData/server-data';

const expect = chai.expect;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

const regularUser = serverData.regularUser;

let serverResponse;

describe(colors.green('SearchRoutes Demo test'), () => {
  before((done) => {
    chai.request(server)
    .post('/users')
    .send(regularUser)
    .end((err, res) => {
      serverResponse = res.body;
      done();
    });
  });
  describe(colors.underline('GET /search/users'), () => {
    it('should return a error if request has no authorisation header',
    (done) => {
      chai.request(server)
      .get('/search/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('should fetch users with query string', (done) => {
      chai.request(server)
      .get('/search/users')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users.length).to.equal(0);
        done();
      });
    });
    it('should fetch users whose fullnames or usernames begin' +
    "with 'esther'", (done) => {
      chai.request(server)
      .get('/search/users/?q=esther')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users.length).to.equal(1);
        done();
      });
    });
  });
  describe(colors.underline('GET /search/documents'), () => {
    it('should fetch documents with query string', (done) => {
      chai.request(server)
      .get('/search/documents')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents.length).to.equal(0);
        done();
      });
    });
    it("should fetch documents whose titles begin with 'public'", (done) => {
      chai.request(server)
      .get('/search/documents/?q=public')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents).to.have.lengthOf.at.least(1);
        done();
      });
    });
  });
});

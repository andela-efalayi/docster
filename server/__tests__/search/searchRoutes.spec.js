import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import server from '../../server';
// import Models from '../../models';

const expect = chai.expect;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe(colors.green('SearchRoutes Demo test'), () => {
  describe(colors.underline('GET /search/users'), () => {
    it('should fetch users with query string', (done) => {
      chai.request(server)
      .get('/search/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.users.length).to.equal(0);
        done();
      });
    });
    it("should fetch users whose fullnames or usernames begin with 'esther'", (done) => {
      chai.request(server)
      .get('/search/users/?q=esther')
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
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents.length).to.equal(0);
        done();
      });
    });
    it("should fetch documents whose titles begin with 'public'", (done) => {
      chai.request(server)
      .get('/search/documents/?q=public')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.documents).to.have.lengthOf.at.least(1);
        done();
      });
    });
  });
});

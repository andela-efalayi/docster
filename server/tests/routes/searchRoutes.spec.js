import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import server from '../../server';
import serverData from '../fakerData/server-data';

const expect = chai.expect;
chai.use(chaiHttp);
const regularUser = serverData.regularUser;

let serverResponse;

/*
  Test Search Routes
*/
describe(colors.green('SearchRoutes'), () => {
  // Create a user before tests are executed
  before((done) => {
    chai.request(server)
    .post('/api/v1/users')
    .send(regularUser)
    .end((err, res) => {
      serverResponse = res.body;
      done();
    });
  });

  describe(colors.underline('SearchUsers function'), () => {
    it('should return a error if token is provided',
    (done) => {
      chai.request(server)
      .get('/api/v1/search/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should fetch users with username/fullname = esther ', (done) => {
      chai.request(server)
      .get('/api/v1/search/users/?q=esther')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  describe(colors.underline('SearchDocuments function'), () => {
    it("should fetch documents with title = oyeendah", (done) => {
      chai.request(server)
      .get('/api/v1/search/documents/?q=oyeendah')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});

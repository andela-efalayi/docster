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
describe(colors.green('SearchRoutes Demo test'), () => {
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

  // Test that token exists
  describe(colors.underline('GET /api/v1/search/users'), () => {
    it('should return a error if request has no authorisation header',
    (done) => {
      chai.request(server)
      .get('/api/v1/search/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });

    // Test that route can serach for users using a querystring
    it('should fetch users whose fullnames or usernames begin' +
    "with 'esther'", (done) => {
      chai.request(server)
      .get('/api/v1/search/users/?q=esther')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  //  Test that route can search for documents using a querystring
  describe(colors.underline('GET /api/v1/search/documents'), () => {
    it("should fetch documents whose titles begin with 'oyeendah'", (done) => {
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
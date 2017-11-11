import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;

chai.use(chaiHttp);

const administrator = serverData.administrator;
const newRole = serverData.userRole;

let createdRole;
let serverResponse;

/*
   Test Role Routes
*/
describe(colors.green('RoleRoutes'), () => {
  // Create a user before tests are executed
  before((done) => {
    chai.request(server)
    .post('/api/v1/users')
    .send(administrator)
    .end((err, res) => {
      serverResponse = res.body;
      done();
    });
  });

  // Test if token exists
  describe(colors.underline('CreateRole function'), () => {
    it('should give an error if no token is provided', (done) => {
      chai.request(server)
      .post('/api/v1/roles')
      .send(newRole)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('should create a role in the database', (done) => {
      chai.request(server)
      .post('/api/v1/roles')
      .send(newRole)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        createdRole = res.body.role;
        expect(res.status).to.equal(201);
        expect(createdRole).to.be.a('object');
        done();
      });
    });
  });

  describe(colors.underline('GetAllRoles function'), () => {
    it('should get all roles from the database', (done) => {
      chai.request(server)
      .get('/api/v1/roles')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    });
  });

  // Test that route can retrieve a role by id
  describe(colors.underline('GetRoleById function'), () => {
    it('should return error if role does not exist', (done) => {
      chai.request(server)
      .get('/api/v1/roles/-1')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should get a role in the database', (done) => {
      chai.request(server)
      .get(`/api/v1/roles/${createdRole.id}`)
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.role.id).to.equal(createdRole.id);
        done();
      });
    });

  });
});

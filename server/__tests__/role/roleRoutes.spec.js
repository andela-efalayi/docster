import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
let createdRole;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe(colors.green('RoleRoutes'), () => {
  describe(colors.underline('POST /roles'), () => {
    it('should create a role in the database', (done) => {
      const newRole = serverData.userRole;

      chai.request(server)
      .post('/roles')
      .send(newRole)
      .end((err, res) => {
        createdRole = res.body.role;        
        expect(res.status).to.equal(201);
        expect(createdRole).to.be.a('object');
        done();
      });
    });
  });
  describe(colors.underline('GET /roles'), () => {
    it('should get all roles from the database', (done) => {
      chai.request(server)
      .get('/roles')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.a('array');
        done();
      });
    });
  });
  describe(colors.underline('GET /roles/:roleId'), () => {
    it('should create a role in the database', (done) => {
      chai.request(server)
      .get(`/roles/${createdRole.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.role.id).to.equal(createdRole.id);
        done();
      });
    });
    it('should return error if role does not exist', (done) => {
      chai.request(server)
      .get('/roles/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        // expect(res.body.role.id).to.equal(createdRole.id);
        // console.log(res.body);
        done();
      });
    });
  });
});

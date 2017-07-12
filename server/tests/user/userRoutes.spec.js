import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
let newuser = serverData.newUser;
let dummyAdmin = serverData.dummyAdmin;
let createdUser;
let createdAdmin;
let serverResponse;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

/*
  Test User Routes
*/
describe(colors.green('UserRoutes'), () => {
  before((done) => {
    chai.request(server)
    .post('/docster/api/v1/users')
    .send(dummyAdmin)
    .end((err, res) => {
      createdAdmin = res.body;
      done();
    });
  });
  // Test that route can create a user
  describe(colors.underline('POST /docster/api/v1/users'), () => {
    it('should create a new user in database', (done) => {
      chai.request(server)
      .post('/docster/api/v1/users')
      .send(newuser)
      .end((err, res) => {
        serverResponse = res.body;
        createdUser = serverResponse.user;
        expect(res.status).to.equal(201);
        expect(serverResponse.message)
        .to.equal('User was created successfully');
        done();
      });
    });
  });

  //  Test that route can login a user
  describe(colors.underline('POST /docster/api/v1/users/login'), () => {
    it('should check if user exists in the database', (done) => {
      const user = newuser.email;
      const password = newuser.password;

      chai.request(server)
      .post('/docster/api/v1/users/login')
      .send({user, password})
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message)
        .to.equal('User was logged in successfully');
        done();
      });
    });
  });

  // Test that route can logout a user
  describe(colors.underline('POST /docster/api/v1/users/logout'), () => {
    it('should log user out ot app', (done) => {
      chai.request(server)
      .post('/docster/api/v1/users/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User is logged out');
        done();
      });
    });
  });

  // Test that route can fetech users from database
  describe(colors.underline('GET /users'), () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(server)
      .get('/docster/api/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('No token provided');
        done();
      });
    });
    it('should return an error if token is provided but user is not '+
    'an admin', (done) => {
      chai.request(server)
      .get('/docster/api/v1/users')
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User is not a docster app admin');
        done();
      });
    });
    it('should return all users if token is provided and user'+
    'is an admin', (done) => {
      chai.request(server)
      .get('/docster/api/v1/users')
      .set('authorisation', 'Bearer '+createdAdmin.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Users were retrieved successfully');
        done();
      });
    });
  });

  // Test that route can fetch users by id
  describe(colors.underline('GET /docster/api/v1/users/:userId'), () => {
    it('should return an error if no token is provided', (done) => {
    chai.request(server)
    .get(`/docster/api/v1/users/${createdUser.id}`)
    .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should return a user if token is provided', (done) => {
    chai.request(server)
    .get(`/docster/api/v1/users/${createdUser.id}`)
      .set('authorisation', 'Bearer '+serverResponse.token)    
    .end((err, res) => {
      expect(res.status).to.equal(200);
        done();
      });
    });

    it('should return user documents', (done) => {
      chai.request(server)
      .get(`/docster/api/v1/users/${createdUser.id}/documents`)
      .set('authorisation', 'Bearer '+serverResponse.token)    
      .end((err, res) => {
        expect(res.body.documents).to.have.all.keys('count', 'rows');
          done();
      });
    });
  });

  // Test that route can edit a user
  describe(colors.underline('PUT /docster/api/v1/users/:userId'), () => {
    it('should get a user with the id specified', (done) => {
      const fullName = serverData.newFullName;
      chai.request(server)
      .put(`/docster/api/v1/users/${createdUser.id}`)
      .send({ fullName })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal(`Username: ${createdUser.userName} was updated successfully`);
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .put('/docster/api/v1/users/-1')
      .send({ userName: 'invalidUserId' })
      .set('authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });

  // Test that route can delete a user
  describe(colors.underline('DELETE /docster/api/v1/users/:userId'), () => {
    it('should delete a user with the id specified', (done) => {
      chai.request(server)
      .delete(`/docster/api/v1/users/${createdUser.id}`)
      .set('authorisation', 'Bearer '+createdAdmin.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User was successfully deleted');
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .delete('/docster/api/v1/users/-1')
      .set('authorisation', 'Bearer '+createdAdmin.token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });
});

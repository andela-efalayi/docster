import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import { decodeToken } from '../../auth/token';
import serverData from '../fakerData/server-data';
import server from '../../server';

const expect = chai.expect;
let newuser = serverData.newUser;
const adminToken = serverData.adminToken;
let createdUser;
let serverResponse;

chai.use(chaiHttp);

/*
  Test User Routes
*/
describe(colors.green('UserRoutes'), () => {
  
  describe(colors.underline('CreateUser function'), () => {
    it('should return an error if user details are incomplete', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.have.all
        .keys(['fullName', 'userName', 'email', 'password']);
        done();
      });
    });
    it('should return an error if user email is invalid', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send(serverData.userWithInvalidEmail)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message.email).to.equal('Email is invalid');
        done();
      });
    });
    it('should create a new user in database', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send(newuser)
      .end((err, res) => {
        serverResponse = res.body;
        createdUser = decodeToken(serverResponse.token);
        expect(res.status).to.equal(201);
        expect(serverResponse.message)
        .to.equal('User created');
        done();
      });
    });
  });

  describe(colors.underline('AuthenticateUser function'), () => {
    it('should return an error if user does not exist', (done) => {
      chai.request(server)
      .post('/api/v1/users/login')
      .send(serverData.nonExistingUser)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('User does not exist');
        done();
      });
    });
    it('should log user into application', (done) => {
      const user = newuser.email;
      const password = newuser.password;

      chai.request(server)
      .post('/api/v1/users/login')
      .send({user, password})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User is logged in');
        done();
      });
    });
  });

  describe(colors.underline('GetAllUsers function'), () => {
    it('should return an error if no token is provided', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('No token provided');
        done();
      });
    });
    it('should return an error if user is not an admin', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body.message).to.equal('User is not an admin');
        done();
      });
    });
    it('should return all users if user is an admin', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .set('Authorisation', 'Bearer '+adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Users retrieved');
        done();
      });
    });
  });

  describe(colors.underline('GetUserById function'), () => {
    it('should return an error if no token is provided', (done) => {
    chai.request(server)
    .get(`/api/v1/users/${createdUser.id}`)
    .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      });
    });

    it('should return a user if token is provided', (done) => {
    chai.request(server)
    .get(`/api/v1/users/${createdUser.id}`)
    .set('Authorisation', 'Bearer '+serverResponse.token)    
    .end((err, res) => {
      expect(res.status).to.equal(200);
        done();
      });
    });
  });
  describe(colors.underline('GetUserDocuments function'), () => {
    it("should return a message if user has no documents", (done) => {
      chai.request(server)
      .get('/api/v1/users/1000/documents')
      .set('Authorisation', 'Bearer '+serverResponse.token)    
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('No documents available');
        done();
      });
    });
    it("should return user's documents", (done) => {
      chai.request(server)
      .get(`/api/v1/users/${createdUser.id}/documents`)
      .set('Authorisation', 'Bearer '+serverResponse.token)    
      .end((err, res) => {
        expect(res.body.message).to.equal('No documents available');
        done();
      });
    });
  })

  describe(colors.underline('UpdateUser function'), () => {
    it('should return an error if user does not exist', (done) => {
      chai.request(server)
      .put('/api/v1/users/-1')
      .send({ userName: 'invalidUserId' })
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Id must be greater than zero');
        done();
      });
    });
    it('should get a user with the specified id', (done) => {
      const fullName = serverData.newFullName;
      chai.request(server)
      .put(`/api/v1/users/${createdUser.id}`)
      .send({ fullName })
      .set('Authorisation', 'Bearer '+serverResponse.token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User updated');
        done();
      });
    });
  });

  describe(colors.underline('LogoutUser function'), () => {
    it('should log user out of application', (done) => {
      chai.request(server)
      .post('/api/v1/users/logout')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal('User is logged out');
        done();
      });
    });
  });

  describe(colors.underline('DeleteUser function'), () => {
    it('should return an error if user does not exist', (done) => {
      chai.request(server)
      .delete('/api/v1/users/-1')
      .set('Authorisation', 'Bearer '+adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Id must be greater than zero');
        done();
      });
    });
    it('should delete a user with the specified id', (done) => {
      chai.request(server)
      .delete(`/api/v1/users/${createdUser.id}`)
      .set('Authorisation', 'Bearer '+adminToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User deleted');
        done();
      });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import colors from 'colors';
import serverData from '../fakerData/server-data';
import model from '../../models';
import server from '../../server';

const expect = chai.expect;
const User = model.User;
let createdUser;

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe(colors.green('UserRoutes'), () => {
  describe(colors.underline('GET /users'), () => {
    it('should get all users from database', (done) => {
      chai.request(server)
      .get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('Users were retrieved successfully');
        done();
      });
    });
  });
  describe(colors.underline('POST /users'), () => {
    it('should create a new user in database', (done) => {
      chai.request(server)
      .post('/users')
      .send(serverData.newUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body.message).to.equal('User was created successfully');
        done();
      });
    });
  });
  describe(colors.underline('GET /users/:userId'), () => {
    it('should get a user with the id specified', (done) => {
      User.create(serverData.appUser)
      .then((user) => {
        createdUser = user.dataValues;
        chai.request(server)
        .get(`/users/${createdUser.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.fullName).to.equal(createdUser.fullName);
          done();
        });
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .get('/users/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });
  describe(colors.underline('PUT /users/:userId'), () => {
    it('should get a user with the id specified', (done) => {
      const fullName = serverData.newFullName;
      chai.request(server)
      .put(`/users/${createdUser.id}`)
      .send({ fullName })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message)
        .to.equal(`Username: ${createdUser.userName} was updated successfully`);
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .put('/users/-1')
      .send({ userName: 'invalidUserId' })
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });
  describe(colors.underline('DELETE /users/:userId'), () => {
    it('should delete a user with the id specified', (done) => {
      chai.request(server)
      .delete(`/users/${createdUser.id}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.equal('User was successfully deleted');
        done();
      });
    });
    it('should give an error if user does not exist', (done) => {
      chai.request(server)
      .delete('/users/-1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('User not found');
        done();
      });
    });
  });
});

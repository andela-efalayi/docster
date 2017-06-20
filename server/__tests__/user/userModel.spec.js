import chai from 'chai';
import colors from 'colors';
import bcrypt from 'bcrypt';

import Models from '../../models';
import testData from '../fakerData/model-data';

const expect = chai.expect;
const assert = chai.assert;
const User = Models.User;

process.env.NODE_ENV = 'test';

describe(colors.green('UserModel'), () => {
  let newUser; // user with complete fields.

  // variable to confirm password hashing
  const newUserPassword = testData.newUser.password;

  describe(colors.underline('Create function'), () => {
    it('should reject an empty username field', (done) => {
      User.create(testData.newUserWithNoUsername)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should reject an empty email field', (done) => {
      User.create(testData.newUserWithNoEmail)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should reject an empty password field', (done) => {
      User.create(testData.newUserWithNoPassword)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should accept a user with all fields', (done) => {
      User.create(testData.newUser)
      .then((user) => {
        newUser = user.dataValues;
        assert.exists(user);
        expect(Object.keys(newUser)).to.have.lengthOf(8);
        done();
      });
    });
    describe(colors.underline('Successfully created user'), () => {
      it('should have an email', () => {
        assert.exists(newUser.email);
      });
      it('should be have a hashed password', () => {
        assert.exists(newUser.password);
        bcrypt.compare(newUserPassword, newUser.password).then((result) => {
          assert.isTrue(result, 'password was hashed');
        });
      });
      it('should have a roleId', () => {
        assert.isDefined(newUser.roleId);
      });
    });
    describe(colors.underline('Existing user'), () => {
      it('should not be created twice', (done) => {
        User.create({
          fullName: newUser.fullName,
          userName: newUser.userName,
          email: newUser.email,
          password: 'duplicateUser',
          roleId: newUser.roleId
        })
          .catch((error) => {
            expect(/SequelizeUniqueConstraintError/.test(error.name)).to.equal(true);
            done();
          });
      });
    });
  });
});

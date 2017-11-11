import chai from 'chai';
import colors from 'colors';
import bcrypt from 'bcrypt-nodejs';
import Models from '../../models';
import testData from '../fakerData/model-data';

const expect = chai.expect;
const assert = chai.assert;
const User = Models.User;

/*
  Test User Model
*/
describe(colors.green('UserModel'), () => {
  let newUser; // user with complete fields.

  // variable to confirm password hashing
  const newUserPassword = testData.newUser.password;

  describe(colors.underline('Create function'), () => {
    it('should fail if no username is provided', (done) => {
      User.create(testData.newUserWithNoUsername)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should fail if no email is provided', (done) => {
      User.create(testData.newUserWithNoEmail)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should fail if no password is provided', (done) => {
      User.create(testData.newUserWithNoPassword)
        .catch((error) => {
          expect(/notNull Violation/.test(error.message)).to.equal(true);
          done();
        });
    });
    it('should create a user', (done) => {
      User.create(testData.newUser)
      .then((user) => {
        newUser = user.dataValues;
        assert.exists(user);
        expect(Object.keys(newUser)).to.have.lengthOf(8);
        done();
      });
    });
     it('should not duplicate a user ', (done) => {
        User.create({
          fullName: newUser.fullName,
          userName: newUser.userName,
          email: newUser.email,
          password: 'duplicateUser',
          roleId: newUser.roleId
        })
          .catch((error) => {
            expect(/SequelizeUniqueConstraintError/.test(error.name))
            .to.equal(true);
            done();
          });
      });

    describe(colors.underline('Created user'), () => {
      it('should have an email', () => {
        assert.exists(newUser.email);
      });
      it('should be a hashed password', () => {
        assert.exists(newUser.password);
        bcrypt.compare(newUserPassword, newUser.password, (err, res) => {
          assert.isTrue(res, 'password was hashed');
        });
      });
      it('should have a roleId', () => {
        assert.isDefined(newUser.roleId);
      });
    });
  });
});

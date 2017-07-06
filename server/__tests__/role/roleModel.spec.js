import chai from 'chai';
import colors from 'colors';
import Models from '../../models';
import testData from '../fakerData/model-data';

const assert = chai.assert;
const Role = Models.Role;
const newRole = testData.newRole;
process.env.NODE_ENV = 'test';

/*
  Test Role Model
*/
describe(colors.green('RoleModel'), () => {
  // Test that a new role can be created
  describe(colors.underline('Create function'), () => {
    it('should create a new role', (done) => {
      Role.create(newRole)
      .then((role) => {
        assert.exists(role);
        done();
      });
    });

    // Test that a role cannot be created twice
    it('should not duplicate a role', (done) => {
      Role.create(newRole)
      .catch((error) => {
        assert.equal(error.message, 'Validation error');
        done();
      });
    });

    // Test that a role cannot have an empty roleType
    it('should reject a null roleType', (done) => {
      Role.create({})
      .catch((error) => {
        assert.equal(error.message,
        'notNull Violation: roleType cannot be null');
        done();
      });
    });
  });
});

import chai from 'chai';
import colors from 'colors';
import Models from '../../models';
import testData from '../fakerData/model-data';

const assert = chai.assert;
const Role = Models.Role;
const newRole = testData.newRole;

/*
  Test Role Model
*/
describe(colors.green('RoleModel'), () => {
  describe(colors.underline('Create function'), () => {
    it('should create a new role', (done) => {
      Role.create(newRole)
      .then((role) => {
        assert.exists(role);
        done();
      });
    });

    it('should not duplicate an existing role', (done) => {
      Role.create(newRole)
      .catch((error) => {
        assert.equal(error.message, 'Validation error');
        done();
      });
    });

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

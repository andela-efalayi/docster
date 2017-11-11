import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';

const Role = Models.Role;

module.exports = {
  /**
   * Create a new role
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  createRole(req, res) {
    return Role
      .findOrCreate({
        where: {
          roleType: req.body.roleType
        }
      }).spread((role, created) => {
        if(role && created === false){
          return res.status(404).send({
            message: 'Role exists'
          });
        }
        return res.status(201).send({
          role,
          message: 'Role created'
        });
      });
  },

  /**
   * Get all role from database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getAllRoles(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return Role
      .findAndCountAll({
        limit,
        offset
      })
      .then((roles) => {
        if(roles.count === 0) {
          return res.status(200).send({
            message: 'No roles in database'
          })
        }
        return res.status(200).send({
          roles,
          message: 'Roles retrieved'
        })
      });
  },

  /**
   * Get a role by Id
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getRoleById(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if (!role) {
          return res.status(404).send({
            message: 'Role not found'
          });
        }
        return res.status(200).send({
          role,
          message: 'Role retrieved'
        });
      });
  }
};

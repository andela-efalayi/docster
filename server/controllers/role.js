/* eslint-disable no-console*/

import colors from 'colors';
import Models from '../models';

const Role = Models.Role;
// const User = Models.User;

module.exports = {
  createRole(req, res) {
    console.log(colors.blue('Creating user role...'));
    return Role
      .create(req.body.roleType)
      .then(role => res.status(201).send({
        role,
        message: 'User role created.'
      }))
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while creating this role.'
      }));
  },
  getAllRoles(req, res) {
    return Role
      .findAll()
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  },
  getRoleById(req, res) {
    return Role
      .findById(req.params.roleId)
      .then((role) => {
        if (!role) {
          res.status(404).send({
            message: 'Role not found.'
          });
        }
        res.status(200).send({
          role,
          message: 'Users retrieved successfully.'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occured while fetching this role.'
      }));
  }
};

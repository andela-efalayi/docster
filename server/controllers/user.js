import bcrypt from 'bcrypt-nodejs';
import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';
import ServerConstants from '../../constants/ServerConstants';
import setPageMetaData from '../utils/setPageMetaData';
import * as auth from '../auth/token';

const User = Models.User;
const Document = Models.Document;
const Role = Models.Role;
const attributes = ServerConstants.USER_ATTRIBUTES;

module.exports = {

  /**
   * Authenticate user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  authenticateUser(req, res){
    return User
      .find({
        attributes: [...ServerConstants.USER_ATTRIBUTES, 'password' ],
        where: {
          $or: {
            userName: {
              $like: `%${req.body.user}%`
            },
            email: {
              $like: `%${req.body.user}%`
            }
          }
        }
      })
      .then((user) => {
        if(!user) {
          return res.status(401).send({
            message: 'User does not exist'
          });
        }
        if (bcrypt.compareSync(req.body.password, user.password) === true) {
          user.password = undefined; // remove password from user attributes
          const token = auth.generateToken(user);
          return res.status(201).send({
            token,
            message: 'User is logged in'
          });
        } else {
          return res.status(401).send({
            message: 'Invalid credentials'
          })
        }
      });
  },

  /**
   * Create a new user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  createUser(req, res) {
    // check if user exists in database else create a new user
    return User
      .findOrCreate({ 
        where: {
          $or: {
            userName: {
              $iLike: `%${req.body.userName}%`
            },
            email: {
              $iLike: `%${req.body.email}%`
            }
          }
        },
        defaults: {
          fullName: req.body.fullName,
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
          roleId: req.body.roleId || 3
        }
      })
      .spread((user, created) => {
        if (user && created === false) {
          return res.status(409).send({
            message: 'Username or email exists'
          });
        }
        const token = auth.generateToken(user); 
        user.password = undefined;       
        return res.status(201).send({
          token,
          created,
          message: 'User created'
        });
      })
      .catch((error) => {
        return res.status(400).send({
          error
        });
      });
  },

  /**
   * Get all users from database
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getAllUsers(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return User
      .findAndCountAll({
        offset,
        limit,
        attributes
      })
      .then((users) => {
        if (users.count === 0) {
          return res.status(200).send({
            message: 'No users available'
          });
        }
        const pageMetaData = setPageMetaData(users.count,
        limit, offset); 
        return res.status(200).send({
          users,
          pageMetaData,
          message: 'Users retrieved'
        });
      });
  },

  /**
   * Get a user by Id
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getUserById(req, res) {
    return User
      .find({
        where: { id: req.params.userId },
        attributes
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User does not exist'
          });
        }
        return res.status(200).send({user});
      });
  },

  /**
   * Get all documents that belong to a user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  getUserDocuments(req, res) {
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;
    return Document
    .findAndCountAll({
      where: { userId: req.params.userId },
      offset,
      limit,
    })
    .then((documents) => {
      if (documents.count === 0) {
        return res.status(200).send({
          message: 'No documents available'
        });
      }
      const pageMetaData = setPageMetaData(documents.count,
        limit, offset); 
      return res.status(200).send({
        documents,
        pageMetaData,
        message: "Documents retrieved"
      });
    });
  },

  /**
   * Update a user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  updateUser(req, res) {
    if(req.body.newRole) {
      if(req.currentUser.roleId !== 1) {
        res.status(403).send({
          message: 'User is not an admin'
        });
      }
      else {
        return Role.find({
          where: {
            roleType: req.body.newRole
          }
        }).then((role) => {
          if(!role) {
            return res.status(404).send({
              message: 'User does not exist'
            });
          }
          User.findById(req.params.userId).then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User does not exist'
              });
            }
            return user.update({
              roleId: role.id
            }).then((userWithUpdate) => {
                userWithUpdate.password = undefined;
                res.status(200).send({
                userWithUpdate,
                message: 'User updated'
              });
            });
         });
        });
      }
    } else {
      return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User does not exist'
          });
        }
        return user
          .update({
            fullName: req.body.fullName || user.fullName,
            userName: req.body.userName || user.userName,
            email: req.body.email || user.email,
            password: req.body.password || user.password
          })
          .then(userWithUpdate => {
              userWithUpdate.password = undefined;
              res.status(200).send({
              userWithUpdate,
              message: 'User updated'
            });
          })
          .catch(error => {
            const dbError = error.errors;
            res.status(400).send({
              dbError,
              message: 'An error occurred while updating'
            });
          });
      });
    }
  },

  /**
   * Delete a user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  deleteUser(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User does not exist'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'User deleted'
          }));
      });
  },

  /**
   * Logout a user
   * @param {object} req 
   * @param {object} res 
   * @returns {object} res
   */
  logoutUser(req, res) {
    return res.status(200).send({
      message: 'User is logged out'
    });
  }
};

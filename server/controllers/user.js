/* eslint-disable no-console*/
import colors from 'colors';
import bcrypt from 'bcrypt';
import Models from '../models';
import QueryConstants from '../../constants/QueryConstants';
import ServerConstants from '../../constants/ServerConstants';
import * as auth from '../auth/token';

const User = Models.User;
const Document = Models.Document;
const attributes = ServerConstants.USER_ATTRIBUTES;

module.exports = {
  authenticateUser(req, res){
    console.log(colors.yellow('Checking user...'));
    return User
      .find({
        attributes: [...ServerConstants.USER_ATTRIBUTES, 'password' ],
        where: {
          $or: {
            userName: {
              $iLike: `%${req.body.user}%`
            },
            email: {
              $iLike: `%${req.body.user}%`
            }
          }
        }
      })
      .then((user) => {
        if(!user) {
          return res.status(401).send({
            message: 'Invalid credentials'
          });
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
          user.password = undefined; // remove password from user attributes
          const token = auth.generateToken(user);
          return res.status(201).send({
            user,
            token,
            message: 'User was logged in successfully'
          });
        } else {
          return res.status(401).send({
            message: 'Invalid password'
          })
        }
      })
      .catch(error => res.status(500).send({
        error,
        message: 'Internal server error'
      }));
  },
  createUser(req, res) {
    console.log(colors.yellow('Creating user...')); 

    // check if user exists in database else create a new user
    return User
      .findOrCreate({ 
        where: {
          $or: {
            fullName: {
              $iLike: `%${req.body.fullName}%`
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
        if (created === false) {
          return res.status(409).send({
            message: 'This user already exists'
          });
        }
        const token = auth.generateToken(user); 
        user.password = undefined;       
        return res.status(201).send({
          user,
          token,
          message: 'User was created successfully'
        });
      })
      .catch(error => {
        res.status(500).send({
          error,
          message: `An error occurred while creating ${req.body.fullName}`
        });
      });
  },
  getAllUsers(req, res) {
    console.log(colors.yellow('Fetching users from database...'));
    const limit = req.query.limit || QueryConstants.DEFAULT_LIMIT,
      offset = req.query.offset || QueryConstants.DEFAULT_OFFSET;

    return User
      .findAll({
        offset,
        limit,
        attributes
      })
      .then((users) => {
        res.status(200);
        if (users.length === 0) {
          res.send({
            message: 'No users available'
          });
        } res.send({
          users,
          message: 'Users were retrieved successfully'
        });
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while getting users from database.'
      }));
  },
  getUserById(req, res) {
    console.log(colors.yellow('Fetching user from database...'));
    return User
      .find({
        where: { id: req.params.userId },
        attributes
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send({
        error,
        message:
        `An error occurred while fetching user with id: ${req.params.userId}`
      }));
  },
  getUserDocuments(req, res) {
    console.log(colors.yellow("Fetching user's documents..."));
    return Document
    .find({
      where: { userId: req.params.userId }
    })
    .then((documents) => {
      if (!documents) {
        return res.status(200).send({
          message: 'No documents available'
        });
      }
      return res.status(200).send({
        documents
      });
    });
  },
  updateUser(req, res) {
    console.log(colors.yellow('Updating user data...'));
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return user
          .update({
            fullName: req.body.fullName || user.fullName,
            userName: req.body.userName || user.userName,
            email: req.body.email || user.email,
            password: req.body.password || user.password
          })
          .then(userWithUpdate => res.status(200).send({
            userWithUpdate,
            message:
            `Username: ${userWithUpdate.userName} was updated successfully`
          }))
          .catch(error => res.status(400).send({
            error,
            message: 'An error occurred while updating'
          }));
      })
      .catch(error => res.status(400).send({
        error,
        message: 'An error occurred while getting user'
      }));
  },
  deleteUser(req, res) {
    console.log(colors.yellow('Deleting user from database...'));
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User not found'
          });
        }
        return user
          .destroy()
          .then(() => res.status(200).send({
            message: 'User was successfully deleted'
          }));
      });
  },
  logoutUser(req, res) {
    return res.status(200).send({
      message: 'User is logged out'
    });
  }
};

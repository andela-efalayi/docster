import isEmpty from 'lodash/isEmpty';
import validator from 'validator';

/**
 * Check if required document details are provided
 * @param {object} req 
 * @param {object} res 
 * @param {func} next 
 * @returns {object} res
 */
export function validateNewDocument(req, res, next){
  const newDocument = req.body;
  if(isEmpty(newDocument)) {
    return res.status(400).send({
      message: 'No document data provided'
    });
  }
  if(!newDocument.title){
    return res.status(400).send({
      message: 'Document must have a title'
    });
  }
  next();
}

/**
 * Check if required user details are provided
 * @param {object} req 
 * @param {object} res 
 * @param {func} next 
 * @returns {object} res
 */
export function validateNewUser(req, res, next){
  const newUser = req.body;
  const errors = {};
  
  if(!newUser.fullName){
    errors.fullName = 'Fullname is required';
  }
  if(!newUser.userName){
    errors.userName = 'Username is required';
  }
  if(!newUser.email){
    errors.email = 'Email is required';
  }
  if(newUser.email && !validator.isEmail(newUser.email)){
    errors.email = 'Email is invalid';
  }
  if(!newUser.password){
    errors.password = 'Password is required';
  }

  if(!isEmpty(errors)) {
    return res.status(400).send({
      message: errors
    })
  }
  next();
}
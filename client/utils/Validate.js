import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

/**
 * @param {object} formData 
 * @returns {object} error status
 */
export function formIsValid(formData) {
  const fields = Object.keys(formData);
  let errors = {};
  
  for(var i = 0; i < fields.length; i++) {
    if(typeof formData[fields[i]] !== 'string') {
      continue;
    } 
    switch(fields[i]) {
      case 'email':
        if(!Validator.isEmail(formData[fields[i]])) {
          errors[fields[i]] = 'Email is invalid'
        }
        if(Validator.isEmpty(formData[fields[i]])) {
          errors[fields[i]] = 'This field is required';
        }
        break;
      case 'confirmPassword': 
        if(!Validator.equals(formData['password'],
          formData['confirmPassword'])) {
          errors.confirmPassword = "Passwords do not match";
        }
        break;
      default: 
        if(Validator.isEmpty(formData[fields[i]])) {
          errors[fields[i]] = 'This field is required';
        }
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}


/**
 * @param {any} string 
 * @returns {bool} isEmpty
 */
export function checkIfEmpty(string) {
  return Validator.isEmpty(string);
}
import omit from 'lodash/omit';

export const isEmailValid = email => {
  const re = /\S+@\S+\.\S+/i
  return re.test(email)
}

/**
 * @param {Object} data 
 * @param {Object} data.user User Inputs
 * @param {Object} data.error Input error messages
 * @returns {Object}
 */
export const userValidation = data => {
  const errors = {};
  const errorFields = omit(data.error, ['email']);
  for(let key in errorFields) {
    if(!data.user[key]) {
      errors[key] = `${key}_required`;
    }
  }

  if(!isEmailValid(data.user.email)) {
    errors['email'] = 'email_invalid';
  }

  const isFormValid = Object.keys(errors).length ? false : true;
  return { isFormValid, errors };
}

/**
 * @param {Object} data 
 * @param {Object} data.inputs Inputs to be validated
 * @param {Object} data.error Input error messages
 * @returns {Object}
 */
export const commonValidation = data => {
  const errors = {};

  for(let field in data.inputs) {
    if(!data.inputs[field]) {
      errors[field] = `${field}_required`;
    }
  }

  const isFormValid = Object.keys(errors).length ? false : true;
  return { isFormValid, errors };
}
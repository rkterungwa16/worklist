import Validator from 'validator';

/**
 * Check user input on login forms
 * @param {string} formInfo user login information
 * @return {*} string or boolean
 */
export const loginFormValidation = (formInfo) => {
  if (!formInfo.email && !formInfo.password) {
    return 'Please enter your details';
  } else if (!formInfo.email && (formInfo.password)) {
    return 'Please enter your email';
  } else if (!formInfo.password && (formInfo.email)) {
    return 'Please enter your password';
  } else if (formInfo.password && !Validator.isEmail(formInfo.email)) {
    return 'Email is invalid';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user signup information
 * @return {*} string or boolean
 */
export const signupFormValidation = (formInfo) => {
  if (!formInfo.username && !formInfo.email && !formInfo.password) {
    return 'Please enter your details';
  } else if (!formInfo.username && (formInfo.email || formInfo.password)) {
    return 'Please enter your username';
  } else if (!formInfo.email && (formInfo.username || formInfo.password)) {
    return 'Please enter your email';
  } else if (/\s/.test(formInfo.username) || /\s/.test(formInfo.password)) {
    return 'Cannot use spaces';
  } else if (!formInfo.password && (formInfo.username || formInfo.email)) {
    return 'Please enter your password';
  } else if (formInfo.password && !Validator.isEmail(formInfo.email)) {
    return 'Email is invalid';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user forgot password information
 * @return {*} string or boolean
 */
export const forgotPasswordFormValidation = (formInfo) => {
  if (!formInfo.email) {
    return 'Please enter your email';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user edit profile information
 * @return {*} string or boolean
 */
export const editProfileFormValidation = (formInfo) => {
  if (formInfo.password !== formInfo.confirmPassword) {
    return 'Your password and confirm password does not match';
  }
  if (!formInfo.currentPassword) {
    return 'Please enter your current password';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo collaborator information
 * @return {*} string or boolean
 */
export const collaboratorFormValidation = (formInfo) => {
  if (!formInfo.email) {
    return 'Please enter collaborator email';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user reset password information
 * @return {*} string or boolean
 */
export const resetPasswordFormValidation = (formInfo) => {
  if (!formInfo.password && !formInfo.email) {
    return 'Please enter your details';
  } else if (formInfo.email && !formInfo.password) {
    return 'Please enter your password';
  } else if (formInfo.password && !formInfo.email) {
    return 'Please enter your email';
  } else if (formInfo.password !== formInfo.confirmPassword) {
    return 'Your entry does not match';
  } else if (!Validator.isEmail(formInfo.email)) {
    return 'Email is invalid';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user task information
 * @return {*} string or boolean
 */
export const taskFormValidation = (formInfo) => {
  if (!formInfo.task) {
    return 'Please enter your task';
  } else if (formInfo.task[0] === ' ') {
    return 'Cannot use spaces';
  }
  return true;
};

/**
 * Check user input on login forms
 * @param {string} formInfo user todo information
 * @return {*} string or boolean
 */
export const todoFormValidation = (formInfo) => {
  if (!formInfo.todo) {
    return 'Please enter your todo';
  } else if (formInfo.todo[0] === ' ') {
    return 'Cannot use spaces';
  }
  return true;
};

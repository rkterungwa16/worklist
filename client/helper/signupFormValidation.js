import Validator from 'validator';

const validateInput = (data) => {
  if (!data.username && !data.email && !data.password) {
    return 'Please enter your details';
  } else if (!data.username && (data.email || data.password)) {
    return 'Please enter your username';
  } else if (!data.email && (data.username || data.password)) {
    return 'Please enter your email';
  } else if (!data.password && (data.username || data.email)) {
    return 'Please enter your password';
  } else if (data.password && !Validator.isEmail(data.email)) {
    return 'Email is invalid';
  }
  return true;
};

export default validateInput;

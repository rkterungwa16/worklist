import Validator from 'validator';

const validateInput = (data) => {
  if (!data.password && !data.email) {
    return 'Please enter your details';
  } else if (data.email && !data.password) {
    return 'Please enter your password';
  } else if (data.password && !data.email) {
    return 'Please enter your email';
  } else if (data.password !== data.confirmPassword) {
    return 'Your entry does not match';
  } else if (!Validator.isEmail(data.email)) {
    return 'Email is invalid';
  }
  return true;
};

export default validateInput;
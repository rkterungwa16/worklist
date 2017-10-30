
const validateInput = (data) => {
  if (data.password !== data.confirmPassword) {
    return 'Your password and confirm password does not match';
  }
  return true;
};

export default validateInput;


const validateInput = (data) => {
  if (data.password !== data.confirmPassword) {
    return 'Your password and confirm password does not match';
  }
  if (!data.currentPassword) {
    return 'Please enter your current password';
  }
  return true;
};

export default validateInput;

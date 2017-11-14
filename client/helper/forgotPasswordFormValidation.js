
const validateInput = (data) => {
  if (!data.email) {
    return 'Please enter your email';
  }
  return true;
};

export default validateInput;


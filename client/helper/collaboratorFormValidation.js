
const validateInput = (data) => {
  if (!data.email) {
    return 'Please enter collaborator email';
  }
  return true;
};

export default validateInput;



const validateInput = (data) => {
  if (!data.todo) {
    return 'Please enter your todo';
  }
  return true;
};

export default validateInput;


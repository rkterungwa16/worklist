const validateInput = (data) => {
  if (!data.task) {
    return 'Please enter your task';
  }
  return true;
};

export default validateInput;

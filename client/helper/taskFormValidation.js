const validateInput = (data) => {
  if (!data.task) {
    return 'Please enter your task';
  } else if (data.task[0] === ' ') {
    return 'Use cannot use spaces';
  }
  return true;
};

export default validateInput;

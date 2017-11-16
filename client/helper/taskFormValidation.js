const validateInput = (data) => {
  if (!data.task) {
    return 'Please enter your task';
  } else if (data.task[0] === ' ') {
    return 'Cannot use spaces';
  }
  return true;
};

export default validateInput;

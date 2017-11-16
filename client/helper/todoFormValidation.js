
const validateInput = (data) => {
  if (!data.todo) {
    return 'Please enter your todo';
  } else if (data.todo[0] === ' ') {
    return 'Cannot use spaces';
  }
  return true;
};

export default validateInput;


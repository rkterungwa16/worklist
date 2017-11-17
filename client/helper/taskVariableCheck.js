/**
 * Set color codes based on priority
 * @param {string} priority Represents the priority of a task
 * @return {string} string representing color codes
 */
export const checkPriority = (priority) => {
  if (priority === 'urgent') {
    return 'task-cat yellow';
  } else if (priority === 'critical') {
    return 'task-cat red';
  }
  return 'task-cat green';
};

/**
 * Set completion status for a task
 * @param {*} completed boolean
 * @return {string} string representing the completion status
 */
export const checkCompletion = (completed) => {
  if (completed === true) {
    return 'completed';
  }
  return '';
};

/**
 * Update task item with date from state and props
 * @param {obj} stateDueDate date object set in the state
 * @param {obj} propsDueDate date object from the props
 * @return {obj} object represent either state date or props date if available
 */
export const checkStateDueDate = (stateDueDate, propsDueDate) => {
  if (stateDueDate) {
    return stateDueDate;
  }
  return propsDueDate;
};

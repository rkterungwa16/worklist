
export const checkPriority = (priority) => {
  if (priority === 'urgent') {
    return 'task-cat yellow';
  } else if (priority === 'critical') {
    return 'task-cat red';
  }
  return 'task-cat green';
};

export const checkCompletion = (completed) => {
  if (completed === true) {
    return 'completed';
  }
  return '';
};

export const checkStateDueDate = (stateDueDate, propsDueDate) => {
  if (stateDueDate) {
    return stateDueDate;
  }
  return propsDueDate;
};

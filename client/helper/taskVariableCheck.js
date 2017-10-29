export const checkPriority = (priority) => {
  if (priority === 'urgent') {
    return 'task-cat red';
  } else if (priority === 'critical') {
    return 'task-cat orange';
  }
  return 'task-cat green';
};

export const checkCompletion = (completed) => {
  if (completed === true) {
    return 'completed';
  }
  return '';
};


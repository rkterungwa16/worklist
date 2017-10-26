import React from 'react';

const TaskItem = (props) => {
  return (
    <a href='#!'className='collection-item black-text'>
      <span className='new badge red'>4</span>
      {props.tasks.task}
    </a>
  );
};

TaskItem.propTypes = {
  tasks: React.PropTypes.shape({
    task: {}
  }).isRequired
};

export default TaskItem;

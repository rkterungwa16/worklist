import React from 'react';

const TaskItem = (props) => {
  return (
    <div>
      <a
        className='collection-item black-text'
      >
        <span className='new badge red'>4</span>
        {props.tasks.task}
      </a>
    </div>
  );
};

TaskItem.propTypes = {
  tasks: React.PropTypes.shape({
    task: {}
  }).isRequired
};

export default TaskItem;

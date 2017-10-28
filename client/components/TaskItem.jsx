import React from 'react';

const TaskItem = (props) => {
  console.log('THIS IS THE TASK OBJECT', props.tasks);
  return (
    <div>
      <a
        href='#!'
        className='collection-item black-text'
        role='menuitem'
        tabIndex='0'
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

import React from 'react';

const TaskItem = (props) => {
  let color;
  console.log('THIS IS THE PROPS', props);
  if (props.tasks.priority === 'urgent') {
    color = 'task-cat red';
  } else if (props.tasks.priority === 'critical') {
    color = 'task-cat orange';
  } else {
    color = 'task-cat green';
  }
  return (
    <div>
      <a
        className='collection-item black-text'
      >
        <span
          className={
            color
          }
        >
          {props.tasks.priority}
        </span>
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

import React from 'react';

const TaskItem = (props) => {
  console.log('THIS IS THE TASK OBJECT', props.tasks);
  let color;
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
        href='#!'
        className='collection-item black-text'
        role='menuitem'
        tabIndex='0'
      >
        <div className='row'>
          <span
            className={
              color
            }
          >{props.tasks.priority}</span>
          {props.tasks.task}
        </div>

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

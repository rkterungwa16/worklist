import React from 'react';

const TaskItem = (props) => {
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
      <div
        className='collection-item black-text'
      >
        <input
          className='toggle'
          type='checkbox'
          id={props.tasks._id}
        />
        <label htmlFor={props.tasks._id}>Done</label>
        <div
          className={
            color
          }
        >
          {props.tasks.task}
        </div>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  tasks: React.PropTypes.shape({
    task: {}
  }).isRequired
};

export default TaskItem;

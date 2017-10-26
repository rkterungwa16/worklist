import React from 'react';
import TaskItem from './TaskItem';


const TaskList = ({ tasks }) => {
  const taskItems = tasks.map((taskItem) => {
    return (
      <TaskItem
        key={taskItem._id}
        tasks={taskItem}
      />
    );
  });

  return (
    <div className='collection'>
      {taskItems}
    </div>
  );
};

TaskList.propTypes = {
  tasks: React.PropTypes.shape([]).isRequired
};

export default TaskList;

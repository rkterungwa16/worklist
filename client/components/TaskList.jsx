import React from 'react';
import TaskItem from './TaskItem';
import TaskForm from '../components/TaskForm';


const TaskList = ({ tasks, todo }) => {
  const taskItems = tasks.map((taskItem) => {
    return (
      <TaskItem
        key={taskItem._id}
        tasks={taskItem}
      />
    );
  });

  return (
    <div>
      {
        todo ?
          <div>
            <h4>{todo.todo}</h4>
            <div className='row'>
              <TaskForm
                todoId={todo.todoId}
              />
            </div>
            <div className='collection'>
              {taskItems}
            </div>
          </div>
          :
          <div>
            <h4>Click on a todo to add tasks</h4>
          </div>
      }

    </div>
  );
};

TaskList.propTypes = {
  tasks: React.PropTypes.shape([]).isRequired,
  todo: React.PropTypes.string.isRequired
};

export default TaskList;

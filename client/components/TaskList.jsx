import React from 'react';
import { connect } from 'react-redux';
import TaskItem from './TaskItem';
import TaskForm from '../components/TaskForm';
import AddedTaskItem from '../components/AddedTaskItem';

/**
* Task Page form component
*/
class TaskList extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.todos = [];
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const tasks = this.props.tasks;
    const todo = this.props.todo;
    const task = this.props.task;
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
                {
                  task.task !== undefined ?
                    <AddedTaskItem
                      tasks={task.task}
                    />
                    :
                    null
                }
              </div>
            </div>
            :
            <div>
              <h4>Click on a todo to add tasks</h4>
            </div>
        }
      </div>
    );
  }
}


TaskList.propTypes = {
  tasks: React.PropTypes.shape({}).isRequired,
  task: React.PropTypes.shape({}).isRequired,
  todo: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  task: state.task.task
});

export default connect(mapStateToProps)(TaskList);


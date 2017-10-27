import React from 'react';
import { connect } from 'react-redux';
import TaskList from '../components/TaskList';

/**
* Task Page form component
*/
class TaskPage extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.createdTask = {};
    this.tasks = [];
    this.todo = {};
  }

  /**
   * A react lifecycle method
   * Recieve the current state of the application
   * @param {any} nextProps
   * @memberof ViewGroup
   * @return {*} null
  */
  componentWillReceiveProps(nextProps) {
    this.tasks = nextProps.currentState.task.tasks;
    this.createdTask = nextProps.currentState.task.task;
    this.tasks = nextProps.currentState.task.tasks;
    this.todo = nextProps.currentState.todo.todoId;
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    return (
      <div className='col s12 m8 l9 blue darken-1'>
        <TaskList
          tasks={this.tasks}
          todo={this.todo}
        />
      </div>
    );
  }
}

TaskPage.propTypes = {
  currentState: React.PropTypes.shape({
    task: {},
    todo: {}
  }).isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

export default connect(mapStateToProps)(TaskPage);


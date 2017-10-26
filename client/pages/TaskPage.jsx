import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import {
  createTask
} from '../actions/actionCreators';

/**
* Task Page form component
*/
class TaskPage extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.tasks = [];
    this.createTask = this.createTask.bind(this);
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
  }

  /**
   * Create a task
   * @param {string} task The name of the task to be created
   * @param {string} priority The priority of the task to be created
   * @memberof CreateGroup
   * @return {*} null
   */
  createTask(task, priority) {
    this.props.createTask({ task, priority });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const formState = this.props.currentState.task.formState;
    return (
      <div className='col s12 m8 l9 red lighten-5'>
        <h4>Learn JavaScript</h4>
        <a
          className='btn-floating btn waves-effect waves-light red'
        >
          +
        </a>
        <a href='#' className='black-text'>
          <span>Add Task</span>
        </a>

        <div className='row'>
          <TaskForm
            onSubmit={this.createTask}
            formState={formState}
          />
        </div>
        <TaskList
          tasks={this.tasks}
        />
      </div>
    );
  }
}

TaskPage.propTypes = {
  createTask: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.shape({
    task: {}
  }).isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createTask
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TaskPage);


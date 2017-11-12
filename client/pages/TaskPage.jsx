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
    this.state = {
      tasks: this.props.task.tasks,
      todo: this.props.todo };
  }

  /**
   * A react lifecycle method
   * Recieve the current state of the application
   * @param {any} nextProps
   * @memberof ViewGroup
   * @return {*} null
  */
  componentWillReceiveProps(nextProps) {
    this.setState({
      tasks: nextProps.task.tasks,
      todo: nextProps.todo });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const { todo, tasks } = this.state;
    return (
      <div
        className='col s12 m8 l9'
        id='task-page'
      >
        <TaskList
          tasks={tasks}
          todo={todo}
        />
      </div>
    );
  }
}

TaskPage.propTypes = {
  task: React.PropTypes.shape({
    task: {},
    tasks: {}
  }).isRequired,
  todo: React.PropTypes.shape({}).isRequired
};

const mapStateToProps = state => ({
  todo: state.todo.todo,
  task: state.task

});

export default connect(mapStateToProps)(TaskPage);


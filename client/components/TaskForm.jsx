
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTask } from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TaskForm extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      task: '',
      priority: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update current form values when user inputs values
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleChange(event) {
    event.preventDefault();
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  /**
   * Submit current form values when user submits form
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.createTask(this.state, this.props.todoId);
    this.setState({
      task: '',
    });
  }

  /**
  * Renders an html form template to task form
  * @returns {object} returns an object representing an html form template
  */
  render() {
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        <div className='row col s12 m6 l6'>
          <div className='input-field'>
            <input
              className='validate'
              type='text'
              id='todolist'
              name='task'
              placeholder='Your Tasks'
              value={this.state.task}
              onChange={this.handleChange}
            />
          </div>
          <button
            className='btn waves-effect waves-light red'
            type='submit'
            name='action'
          >
              Add Task
          </button>
        </div>
      </form>
    );
  }
}

TaskForm.propTypes = {
  createTask: React.PropTypes.func.isRequired,
  todoId: React.PropTypes.string.isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({
  createTask
}, dispatch);

export default connect(null,
  matchDispatchToProps)(TaskForm);


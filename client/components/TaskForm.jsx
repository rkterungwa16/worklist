
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTaskForm } from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TaskForm extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeTask = this.changeTask.bind(this);
  }

  /**
   * Submit current form values on submit
   * @param {*} event html DOM events when form is submitted
   * @return {*} null
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.formState.task);
  }

  /**
   * Emit the new form state of the application
   * @param {*} newFormState The current form state
   * @return {*} null
  */
  emitChange(newFormState) {
    this.props.createTaskForm(newFormState);
  }

  /**
   * Update state groupname on change in the create group form
   * @param {*} event
   * @return {*} null
  */
  changeTask(event) {
    this.emitChange({ ...this.props.formState, task: event.target.value });
  }

  /**
  * Renders an html form template to create groups
  * @returns {object} returns an object representing an html form template
  */
  render() {
    return (
      <form className='col s12' onSubmit={this.onSubmit}>
        <div className='row col s12 m6 l6'>
          <div className='input-field'>
            <input
              className='validate'
              type='text'
              id='todolist'
              placeholder='Your Todo Lists'
              value={this.props.formState.task}
              onChange={this.changeTask}
            />
          </div>
          <button
            className='btn waves-effect waves-light red'
            type='submit'
            name='action'
          >
              Add Task
          </button>
          <a
            className='btn waves-effect waves-light white black-text'
          >
            Cancel
          </a>
        </div>
      </form>
    );
  }
}

TaskForm.propTypes = {
  createTaskForm: React.PropTypes.func.isRequired,
  formState: React.PropTypes.shape({
    task: ''
  }).isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({
  createTaskForm
}, dispatch);

export default connect(null,
  matchDispatchToProps)(TaskForm);


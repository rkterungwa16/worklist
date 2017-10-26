import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTodoListForm } from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TodoListForm extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeTodoList = this.changeTodoList.bind(this);
  }

  /**
   * Submit current form values on submit
   * @param {*} event html DOM events when form is submitted
   * @return {*} null
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.props.formState.todolist);
  }

  /**
   * Emit the new form state of the application
   * @param {*} newFormState The current form state
   * @return {*} null
  */
  emitChange(newFormState) {
    this.props.createTodoListForm(newFormState);
  }

  /**
   * Update state groupname on change in the create group form
   * @param {*} event
   * @return {*} null
  */
  changeTodoList(event) {
    this.emitChange({ ...this.props.formState, todolist: event.target.value });
  }

  /**
  * Renders an html form template to create groups
  * @returns {object} returns an object representing an html form template
  */
  render() {
    return (
      <form className='col s12' onSubmit={this.onSubmit}>
        <div className='row'>
          <div className='input-field'>
            <input
              className='validate'
              type='text'
              id='todolist'
              placeholder='Your Todo Lists'
              value={this.props.formState.todolist}
              onChange={this.changeTodoList}
            />
          </div>
          <button
            className='btn waves-effect waves-light red'
            type='submit'
            name='action'
          >
            Create Todo List
          </button>
        </div>
      </form>
    );
  }
}

TodoListForm.propTypes = {
  createTodoListForm: React.PropTypes.func.isRequired,
  formState: React.PropTypes.shape({
    todolist: ''
  }).isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({
  createTodoListForm
}, dispatch);

export default connect(null,
  matchDispatchToProps)(TodoListForm);

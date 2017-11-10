import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import todoFormValidation from '../helper/todoFormValidation';
import {
  createTodo,
  getTodoList,
  setTodoFormError
} from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TodoForm extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      todo: ''
    };
    this.todoList = [];
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update current form values when user inputs values
   * @param {*} event Html DOM object when todo form is submitted
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
   * @param {*} event Html DOM object when register form is submitted
   * @return {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (todoFormValidation(this.state) === true) {
      this.props.createTodo(this.state);
      this.props.getTodoList();
      this.props.setTodoFormError('');
    } else {
      this.props.setTodoFormError(todoFormValidation(this.state));
    }
    this.setState({
      todo: '',
    });
  }

  /**
  * Renders an html form template to todo form
  * @returns {object} returns an object representing an html form template
  */
  render() {
    this.todoList = this.props.todoList;
    const { todoFormError } = this.props.error;
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        {
          this.state.todo === '' ?
            <div className='red-text'>
              {todoFormError}
            </div>
            :
            null
        }
        <div className='row'>
          <div className='input-field'>
            <input
              className='validate black-text'
              type='text'
              id='todo'
              name='todo'
              maxLength='25'
              placeholder='Create Your Todos'
              value={this.state.todo}
              onChange={this.handleChange}
            />
          </div>
          <button
            className='btn waves-effect waves-light app-btn'
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

TodoForm.propTypes = {
  createTodo: React.PropTypes.func.isRequired,
  getTodoList: React.PropTypes.func.isRequired,
  setTodoFormError: React.PropTypes.func.isRequired,
  todoList: React.PropTypes.shape([]).isRequired,
  error: PropTypes.Object,
};

TodoForm.defaultProps = {
  error: {
    todoFormError: ''
  }
};

const mapStateToProps = state => ({
  error: state.error
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createTodo,
  getTodoList,
  setTodoFormError
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TodoForm);

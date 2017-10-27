import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  createTodo,
  getTodoList
} from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TodoListForm extends React.Component {
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
    this.props.createTodo(this.state);
    this.props.getTodoList();
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
    return (
      <form className='col s12' onSubmit={this.handleSubmit}>
        <div className='row'>
          <div className='input-field'>
            <input
              className='validate'
              type='text'
              id='todo'
              name='todo'
              placeholder='Your Todos'
              value={this.state.todo}
              onChange={this.handleChange}
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
  createTodo: React.PropTypes.func.isRequired,
  todoList: React.PropTypes.shape([]).isRequired
};

const matchDispatchToProps = dispatch => bindActionCreators({
  createTodo,
  getTodoList
}, dispatch);

export default connect(null,
  matchDispatchToProps)(TodoListForm);

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getTasks,
  getTodoItem
} from '../actions/actionCreators';

/**
* Get all todos for a user
*/
class TodoListItem extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.id = '';
    this.todo = {};
    this.handleClick = this.handleClick.bind(this);
  }


  /**
   * Submit current form values on submit
   * @param {*} event html DOM events when form is submitted
   * @return {*} null
   */
  handleClick(event) {
    event.preventDefault();
    this.props.getTasks(this.id);
    this.props.getTodoItem(this.id);
  }

  /**
  * Renders an html form template for a user todos
  * @returns {object} returns an object representing an html form template
  */
  render() {
    this.id = this.props.todoItem._id;
    this.todo.todo = this.props.todoItem.todo;
    this.todo.todoId = this.props.todoItem._id;

    return (
      <div>
        <a
          id={`todo-link-btn${this.todo.todoId}`}
          className='collection-item'
          onClick={this.handleClick}
          role='menuitem'
          tabIndex='0'
        >
          <span
            id={`todo-text${this.todo.todoId}`}
            className='badge'
          >{this.props.todoItem.tasks.length}
          </span>
          {this.props.todoItem.todo}
        </a>
      </div>
    );
  }
}

TodoListItem.propTypes = {
  todoItem: PropTypes.Object,
  getTasks: React.PropTypes.func.isRequired,
  getTodoItem: React.PropTypes.func.isRequired
};


TodoListItem.defaultProps = {
  todoItem: {
    todo: '',
    tasks: []
  }
};


const matchDispatchToProps = dispatch => bindActionCreators({
  getTasks,
  getTodoItem
}, dispatch);

export default connect(null,
  matchDispatchToProps)(TodoListItem);


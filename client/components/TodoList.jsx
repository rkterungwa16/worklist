import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TodoItem from './TodoItem';


/**
* Task Page form component
*/
class TodoList extends React.Component {
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
    const todos = this.props.todo.todolists;
    const todoItems = todos.map((todoItem) => {
      return (
        <TodoItem
          key={todoItem._id}
          todoItem={todoItem}
        />
      );
    });
    return (
      <div className='collection'>
        {todoItems}
      </div>
    );
  }
}


TodoList.propTypes = {
  todo: PropTypes.Object
};

TodoList.defaultProps = {
  todo: {
    todoItem: {}
  }
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(mapStateToProps,
  null)(TodoList);


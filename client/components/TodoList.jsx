import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getTasks
} from '../actions/actionCreators';
import TodoItem from './TodoItem';
import AddedTodoItem from './AddedTodoItem';


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
   * A react lifecycle method
   * Recieve the current state of the application
   * @param {any} nextProps
   * @memberof TodoList
   * @return {*} null
  */
  componentWillReceiveProps(nextProps) {
    this.setState({ todos: nextProps.currentState.todo.todolists });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const addedTodo = this.props.currentState.todo.todoItem;
    const todoItems = this.state.todos.map((todoItem) => {
      return (
        <TodoItem
          key={todoItem._id}
          todoItem={todoItem}
          getTasks={getTasks}
        />
      );
    });
    return (
      <div className='collection'>
        {todoItems}
        {
          addedTodo.createdTodo !== undefined ?
            <AddedTodoItem
              todoItem={addedTodo.createdTodo}
              getTasks={getTasks}
            />
            :
            null
        }
      </div>
    );
  }
}


TodoList.propTypes = {
  currentState: PropTypes.Object
};

TodoList.defaultProps = {
  currentState: {
    todo: {}
  }
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getTasks,
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TodoList);


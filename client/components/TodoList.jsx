import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getTasks,
  getTodoList
} from '../actions/actionCreators';
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
   * A react lifecycle method
   * Get all todos of a user when this component mounts
   * @memberof TodoItem
   * @return {*} null
   */
  componentWillMount() {
    this.props.getTodoList();
  }

  /**
   * A react lifecycle method
   * Recieve the current state of the application
   * @param {any} nextProps
   * @memberof TodoItem
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
      </div>
    );
  }
}


TodoList.propTypes = {
  getTodoList: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.shape({
    todo: {}
  }).isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  getTasks,
  getTodoList
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TodoList);


import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TodoList from '../components/TodoList';
import TodolistForm from '../components/TodoForm';
import { createTodo,
  getTodoList
} from '../actions/actionCreators';

/**
* Task Page form component
*/
class TodoListPage extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.todos = [];
    this.createTodo = this.createTodo.bind(this);
  }

  /**
   * A react lifecycle method
   * Get all todos of a user when this component mounts
   * @memberof TodoListPage
   * @return {*} null
   */
  componentWillMount() {
    this.props.getTodoList();
  }

  /**
   * A react lifecycle method
   * Recieve the current state of the application
   * @param {any} nextProps
   * @memberof ViewGroup
   * @return {*} null
  */
  componentWillReceiveProps(nextProps) {
    this.setState({ todos: nextProps.currentState.todo.todolists });
  }

  /**
   * Create a task
   * @param {string} todo The name of the todo list to be created
   * @memberof CreateTodo
   * @return {*} null
   */
  createTodo(todo) {
    this.props.createTodo({ todo });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    console.log(this.props.currentState.todo);
    const formState = this.props.currentState.todo.formState;
    const todoList = this.props.currentState.todo.todolists;
    return (
      <div className='col s12 m4 l3 color white'>
        <TodolistForm
          onSubmit={this.createTodo}
          formState={formState}
          todoList={todoList}
        />
        <TodoList />
      </div>
    );
  }
}

TodoListPage.propTypes = {
  createTodo: React.PropTypes.func.isRequired,
  getTodoList: React.PropTypes.func.isRequired,
  currentState: React.PropTypes.shape({
    todo: {}
  }).isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createTodo,
  getTodoList
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TodoListPage);

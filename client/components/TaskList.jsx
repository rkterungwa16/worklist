import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import TaskItem from './TaskItem';
import TaskForm from '../components/TaskForm';
import AddedTaskItem from '../components/AddedTaskItem';
import CollaboratorForm from '../components/CollaboratorForm';

/**
* Task Page form component
*/
class TaskList extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      modalIsOpen: false
    };
    this.todos = [];
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.customStyles = {
      content: {
        top: '20%',
        left: '60%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '0%',
        transform: 'translate(-50%, -50%)'
      }
    };
  }

  /**
   * Open modal on modal state true
   * @param {*} null Html DOM object when register form is submitted
   * @return {*} null
   */
  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  /**
   * Close modal on modal state false
   * @param {*} null Html DOM object when register form is submitted
   * @return {*} null
   */
  closeModal() {
    this.setState({
      modalIsOpen: false
    });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const tasks = this.props.tasks;
    const todo = this.props.todo;
    const task = this.props.task;
    const taskItems = tasks.map((taskItem) => {
      return (
        <TaskItem
          key={taskItem._id}
          tasks={taskItem}
        />
      );
    });

    return (
      <div>
        {
          todo ?
            <div>
              <div className='card col l6'>
                <h4>{todo.todo}</h4>
              </div>
              <div className='row'>
                <TaskForm
                  todoId={todo.todoId}
                />
              </div>

              <div>
                <button
                  onClick={this.openModal}
                  className='btn waves-effect waves-light red'
                >
                  Add Collaborator
                </button>
              </div>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={this.customStyles}
              >
                <CollaboratorForm
                  todoId={this.props.todo.todoId}
                />
              </Modal>
              <div className='collection'>
                {taskItems}
                {
                  task.task !== undefined ?
                    <AddedTaskItem
                      tasks={task.task}
                    />
                    :
                    null
                }
              </div>
            </div>
            :
            <div>
              <h4>Click on a todo to add tasks</h4>
            </div>
        }
      </div>
    );
  }
}


TaskList.propTypes = {
  tasks: React.PropTypes.shape({}).isRequired,
  task: React.PropTypes.shape({}).isRequired,
  todo: React.PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  task: state.task.task
});

export default connect(mapStateToProps)(TaskList);


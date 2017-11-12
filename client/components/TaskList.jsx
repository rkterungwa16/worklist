import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import TaskItem from './TaskItem';
import TaskForm from '../components/TaskForm';
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
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
      },
      content: {
        top: '30%',
        left: '52%',
        right: 'auto',
        // background: '#bbb',
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
    const taskItems = tasks.map(taskItem => (
      <TaskItem
        key={taskItem._id}
        tasks={taskItem}
        todoId={todo._id}
      />
    ));

    return (
      <div>
        {
          todo.todo !== undefined ?
            <div>
              <div className='col l6'>
                <h4>{todo.todo}
                  <Tooltip
                    placement='top'
                    overlay='Add Collaborator'
                    arrowContent={<div className='rc-tooltip-arrow-inner' />}
                  >

                    <button
                      onClick={this.openModal}
                      className='btn-floating btn-large collab waves-effect waves-light red'
                    >
                      <i className='material-icons'>group_add</i>
                    </button>
                  </Tooltip>
                </h4>

              </div>
              <div className='row'>
                <TaskForm
                  todoId={todo._id}
                />
              </div>

              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={this.customStyles}
              >
                <CollaboratorForm
                  todoId={this.props.todo._id}
                />
              </Modal>
              <div className='collection task'>
                {taskItems}
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


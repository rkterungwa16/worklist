import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import 'react-datepicker/dist/react-datepicker.css';
import {
  checkPriority,
  checkCompletion,
  checkStateDueDate,
} from '../helper/taskVariableCheck';
import {
  completeTask,
  setTaskDueDate,
  deleteTask,
  editingTask,
  editTask
} from '../actions/actionCreators';

/**
* Task Item component
*/
class TaskItem extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      dueDate: '',
      date: '',
      task: this.props.tasks.task,
      editedTask: this.props.tasks.task,
      isOpen: false,
      deleted: this.props.deleted,
      editing: this.props.editing,
      completed: this.props.tasks.completed
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
    this.deleteOnClick = this.deleteOnClick.bind(this);
    this.editOnClick = this.editOnClick.bind(this);
    this.clearEditOnClick = this.clearEditOnClick.bind(this);
    this.handleEditTaskChange = this.handleEditTaskChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update when check box is clicked for a task
   * @param {object} completeStatus
   * @return {*} null
   */
  handleChange(completeStatus) {
    if (completeStatus === false) {
      this.setState({
        value: 'completed',
        completed: true
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: true
      });
    } else if (completeStatus === true) {
      this.setState({
        value: '',
        completed: false
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: false
      });
    }
  }

  /**
   * Select the due date for task
   * @param {*} date the date selected in date picker
   * @return {*} null
   */
  handleDateChange(date) {
    this.props.setTaskDueDate({
      id: this.props.tasks._id,
      dueDate: date
    });
    this.setState({
      dueDate: date,
      isOpen: !this.state.isOpen
    });
  }

  /**
   * Delete a task
   * @param {*} date the date selected in date picker
   * @return {*} null
   */
  deleteOnClick() {
    this.setState({
      deleted: true
    });
    const taskInfo = {
      taskId: this.props.tasks._id,
      todoId: this.props.todoId
    };
    this.props.deleteTask(taskInfo);
  }

  /**
   * Initiate the editing of a task
   * @param {*} null
   * @return {*} null
   */
  editOnClick() {
    this.setState({
      editing: true
    });
  }

  /**
   * Clear the edit box on click
   * @param {*} null
   * @return {*} null
   */
  clearEditOnClick() {
    this.setState({
      editing: false
    });
  }

  /**
   * Return to application screen from calendar modal
   * @param {*} event the date selected in date picker
   * @return {*} null
   */
  toggleCalendar(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  }

  /**
   * Update current form values when user inputs values
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleEditTaskChange(event) {
    event.preventDefault();
    const obj = {};
    obj[event.target.name] = event.target.value;
    this.setState(obj);
  }

  /**
   * Submit current form values when user submits form
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.editedTask !== '') {
      this.props.editTask(this.state.editedTask, this.props.tasks._id);
      this.setState({
        task: this.state.editedTask,
      });
    }
    this.setState({
      editedTask: ''
    });
  }


  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const color = `material-icons ${checkPriority(this.props.tasks.priority)}-text`;
    const completed = `task-priority ${checkCompletion(this.state.completed)}`;

    const selectedDueDate = checkStateDueDate(this.state.dueDate, this.props.tasks.dueDate);
    const selectedDueDateFormat = moment(selectedDueDate).format('DD-MM-YYYY');
    const diffBtwMoments = moment(selectedDueDate).diff(moment(moment()));
    const hours = Math.ceil(moment.duration(diffBtwMoments).asHours());
    const days = Math.ceil(moment.duration(diffBtwMoments).asDays());
    return (
      <div>
        {
          !this.state.deleted ?
            <div className='task-item'>
              <div
                className='collection-item white-text'
                id='taskCalendar'
              >
                <div
                  className='task-text black-text'
                >
                  {
                    this.state.editing && !this.state.completed ?
                      <div>
                        <form id='clear-edit-form' onSubmit={this.handleSubmit}>
                          <div className='input-field clear-edit-input'>
                            <input
                              className='edit-task black-text'
                              type='text'
                              id='clear-edit-input'
                              name='editedTask'
                              maxLength='65'
                              placeholder='Create Your Tasks'
                              value={this.state.editedTask}
                              onChange={this.handleEditTaskChange}
                            />
                          </div>

                          <div className='input-field edit-task-div'>
                            <button
                              className='btn waves-effect waves-light edit-task-btn'
                              type='submit'
                              id={`clear-edit-btn${this.props.tasks._id}`}
                              name='action'
                            >
                              Edit Task
                            </button>

                            <Tooltip
                              placement='top'
                              overlay='clear edit'
                              arrowContent={<div className='rc-tooltip-arrow-inner' />}
                            >
                              <button
                                id='clear-edit-btn'
                                className=''
                                role='menuitem'
                                tabIndex='0'
                                onClick={this.clearEditOnClick}
                              >
                                <i
                                  className='material-icons small circle'
                                  id={`clear${this.props.tasks._id}`}
                                >
                              clear
                                </i>
                              </button>
                            </Tooltip>
                          </div>
                        </form>
                      </div>
                      :
                      <div>
                        <Tooltip
                          placement='top'
                          overlay='edit task'
                          arrowContent={<div className='rc-tooltip-arrow-inner' />}
                        >
                          <button
                            id={this.props.tasks._id}
                            className={'edit-btn'}
                            role='menuitem'
                            tabIndex='0'
                            onClick={this.editOnClick}
                          >
                            <i
                              className='material-icons small circle'
                              id={`edit${this.props.tasks._id}`}
                            >
                            edit
                            </i>
                          </button>
                        </Tooltip>
                        <Tooltip
                          placement='top'
                          overlay={this.state.completed ? 'completed' : 'mark as complete'}
                          arrowContent={<div className='rc-tooltip-arrow-inner' />}
                        >
                          <button
                            id={this.props.tasks._id}
                            className={'complete-input'}
                            onClick={() => this.handleChange(this.state.completed)}
                            role='menuitem'
                            tabIndex='0'
                          >
                            <i
                              className='material-icons small circle'
                              id={this.props.tasks._id}
                            >
                              {
                                this.state.completed ?
                                  'done'
                                  :
                                  'check_box_outline_blank'
                              }
                            </i>
                          </button>
                        </Tooltip>
                        <Tooltip
                          placement='top'
                          overlay='delete task'
                          arrowContent={<div className='rc-tooltip-arrow-inner' />}
                        >
                          <button
                            id={this.props.tasks._id}
                            className={'delete-btn'}
                            role='menuitem'
                            tabIndex='0'
                            onClick={this.deleteOnClick}
                          >
                            <i
                              className='material-icons small circle'
                              id={`delete${this.props.tasks._id}`}
                            >
                          delete
                            </i>
                          </button>
                        </Tooltip>
                        <i
                          className={color}
                        >brightness_1
                        </i>
                        <span
                          className={completed}
                        >
                          {this.state.task}
                        </span>

                        <Tooltip
                          placement='top'
                          overlay='Select Due date for task'
                          arrowContent={<div className='rc-tooltip-arrow-inner' />}
                        >
                          <button
                            className='btn waves-effect waves-light blue'
                            onClick={this.toggleCalendar}
                          >
                            {selectedDueDateFormat}
                          </button>
                        </Tooltip>
                      </div>
                  }

                  {
                    this.state.isOpen && (
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        withPortal
                        inline
                      />
                    )
                  }
                </div>
                <div className='due-date'>
                  {
                    diffBtwMoments > 0 && !this.state.completed ?
                      <div>
                        <span
                          className='color grey-text due-date-reminder-hours'
                        >
                          {hours} hours left
                        </span>
                        <span
                          className='color grey-text due-date-reminder-days'
                        >
                          {days} day(s) left
                        </span>
                      </div>
                      :
                      null
                  }
                </div>

              </div>
            </div>
            :
            null
        }
      </div>
    );
  }
}

TaskItem.propTypes = {
  tasks: React.PropTypes.shape({
    task: {},
    priority: '',
    completed: false,
    dueDate: {}
  }).isRequired,
  todoId: React.PropTypes.string.isRequired,
  completeTask: React.PropTypes.func.isRequired,
  setTaskDueDate: React.PropTypes.func.isRequired,
  completed: React.PropTypes.bool.isRequired,
  deleteTask: React.PropTypes.func.isRequired,
  deleted: React.PropTypes.bool.isRequired,
  editTask: React.PropTypes.func.isRequired,
  editing: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  completed: state.task.completed,
  deleted: state.task.deleted
});

const matchDispatchToProps = dispatch => bindActionCreators({
  completeTask,
  setTaskDueDate,
  deleteTask,
  editingTask,
  editTask
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TaskItem);

import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-datepicker/dist/react-datepicker.css';
import {
  checkPriority,
  checkCompletion
} from '../helper/taskVariableCheck';
import {
  completeTask,
  taskDueDate
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
      dueDate: moment(),
      dateCreated: moment()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  /**
   * Update when check box is clicked for a task
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleChange(event) {
    event.preventDefault();
    if (event.target.value === 'on') {
      this.setState({
        value: 'completed',
        dueDate: ''
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: true
      });
    }
  }

  /**
   * Select the due date for task
   * @param {*} date the date selected in date picker
   * @return {*} null
   */
  handleDateChange(date) {
    this.setState({
      dueDate: date
    });
  }

  /**
  * Create a template of all tasks for a todo list
  * @returns {object} an object representing the html template of all tasks for a todo list.
  */
  render() {
    const color = checkPriority(this.props.tasks.priority);
    let completed;
    if (!this.props.tasks.completed && this.state.value) {
      completed = this.state.value;
    } else {
      completed = checkCompletion(this.props.tasks.completed);
    }

    console.log('THIS IS THE DATE CREATED', moment().format());
    const created = moment();
    const due = this.state.dueDate;
    console.log('THIS IS THE DATE DUE', due.format());
    console.log('DATE CREATED IS BEFORE DUE DATE', moment(created).isBefore(due));
    return (
      <div>
        <div
          className='collection-item white-text'
        >
          <input
            className='toggle'
            type='checkbox'
            id={this.props.tasks._id}
            onChange={this.handleChange}
          />
          <label htmlFor={this.props.tasks._id}>Done</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />
          <span className='black-text task-cat blue'>Due date</span>
          <div
            className={color}
          >
            <span
              className={completed}
            >
              {this.props.tasks.task}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

TaskItem.propTypes = {
  tasks: React.PropTypes.shape({
    task: {},
    priority: '',
    completed: false
  }).isRequired,
  completeTask: React.PropTypes.func.isRequired,
  completed: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  completed: state.task.completed
});

const matchDispatchToProps = dispatch => bindActionCreators({
  completeTask,
  taskDueDate
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TaskItem);

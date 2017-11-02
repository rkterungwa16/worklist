import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'react-datepicker/dist/react-datepicker.css';
import {
  checkPriority,
  checkCompletion,
  checkStateDueDate
} from '../helper/taskVariableCheck';
import {
  completeTask,
  setTaskDueDate
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
      isOpen: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
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
        dueDate: '',
        date: moment()
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: true,
        date: moment()
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
   * Return to application screen from calendar modal
   * @param {*} event the date selected in date picker
   * @return {*} null
   */
  toggleCalendar(event) {
    event.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
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

    const selectedDueDate = checkStateDueDate(this.state.dueDate, this.props.tasks.dueDate);
    const selectedDueDateFormat = moment(selectedDueDate).format('DD-MM-YYYY');
    const diffBtwMoments = moment(selectedDueDate).diff(moment(moment()));
    const hours = Math.ceil(moment.duration(diffBtwMoments).asHours());
    const days = Math.ceil(moment.duration(diffBtwMoments).asDays());
    return (
      <div>
        <div
          className='collection-item white-text'
          id='taskCalendar'
        >
          <span
            className='waves-effect waves-light task-cat blue'
          >Select Due date
          </span>
          <div>
            <button
              className='btn waves-effect waves-light blue'
              onClick={this.toggleCalendar}
            >
              {selectedDueDateFormat}
            </button>
          </div>
          <div>
            {
              diffBtwMoments > 0 ?
                <div>
                  <span
                    className='color red'
                  >
                    {hours} hours left
                  </span>
                  <br />
                  <span
                    className='color red'
                  >
                    {days} day(s) left
                  </span>
                </div>
                :
                null
            }
          </div>
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

          <input
            className='toggle'
            type='checkbox'
            id={this.props.tasks._id}
            onChange={this.handleChange}
          />
          <label htmlFor={this.props.tasks._id}>Done</label>
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
    completed: false,
    dueDate: {}
  }).isRequired,
  completeTask: React.PropTypes.func.isRequired,
  setTaskDueDate: React.PropTypes.func.isRequired,
  completed: React.PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  completed: state.task.completed
});

const matchDispatchToProps = dispatch => bindActionCreators({
  completeTask,
  setTaskDueDate
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TaskItem);

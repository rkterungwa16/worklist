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
  checkStateDueDate
} from '../helper/taskVariableCheck';
import {
  completeTask,
  setTaskDueDate
} from '../actions/actionCreators';


/**
* Task Item component
*/
class AddedTaskItem extends React.Component {
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
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleCalendar = this.toggleCalendar.bind(this);
  }


  /**
   * Update when check box is clicked for a task
   * @param {object} data
   * @return {*} null
   */
  handleChange(data) {
    if (data === false) {
      this.setState({
        value: 'completed'
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: true
      });
    } else if (data === true) {
      this.setState({
        value: '',
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
    const color = `material-icons ${checkPriority(this.props.tasks.priority)}-text`;

    let completed;
    let check;
    if (!this.props.tasks.completed && this.state.value) {
      completed = `task-priority ${this.state.value}`;
      check = '';
    } else {
      completed = `task-priority ${checkCompletion(this.props.tasks.completed)}`;
      check = 'check';
    }

    const selectedDueDate = checkStateDueDate(this.state.dueDate, this.props.tasks.dueDate);
    const selectedDueDateFormat = moment(selectedDueDate).format('DD-MM-YYYY');
    const diffBtwMoments = moment(selectedDueDate).diff(moment(moment()));
    const hours = Math.ceil(moment.duration(diffBtwMoments).asHours());
    const days = Math.ceil(moment.duration(diffBtwMoments).asDays());
    return (
      <div className='task-item'>
        <div
          className='collection-item white-text'
          id='taskCalendar'
        >

          <div
            className='task-text black-text'
          >
            <button
              id={this.props.tasks._id}
              className={`circle ${check}`}
              onClick={() => this.handleChange(this.props.tasks.completed)}
              role='menuitem'
              tabIndex='0'
            >
              <i
                className='material-icons small circle'
                id={this.props.tasks._id}
              >
                    done
              </i>
            </button>
            <i
              className={color}
            >brightness_1
            </i>
            <span
              className={completed}
            >
              {this.props.tasks.task}
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
          <div>
            {
              diffBtwMoments > 0 ?
                <div>
                  <span
                    className='color red due-date-reminder'
                  >
                    {hours} hours left
                  </span>
                  <br />
                  <span
                    className='color red due-date-reminder'
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
    );
  }
}

AddedTaskItem.propTypes = {
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
  matchDispatchToProps)(AddedTaskItem);

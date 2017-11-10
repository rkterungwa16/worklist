
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
import { bindActionCreators } from 'redux';
import 'rc-tooltip/assets/bootstrap_white.css';
import taskFormValidation from '../helper/taskFormValidation';
import {
  createTask,
  getTasks,
  setTaskFormError
} from '../actions/actionCreators';

/**
* Form to create todo lists
*/
class TaskForm extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      task: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update current form values when user inputs values
   * @param {*} event Html DOM object when task form is submitted
   * @return {*} null
   */
  handleChange(event) {
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
    if (taskFormValidation(this.state) === true) {
      let priority;
      if (document.getElementById('normal').checked) {
        priority = 'normal';
      } else if (document.getElementById('critical').checked) {
        priority = 'critical';
      } else if (document.getElementById('urgent').checked) {
        priority = 'urgent';
      }
      this.props.createTask(this.state, this.props.todoId, priority);
      this.props.getTasks(this.props.todoId);
      this.props.setTaskFormError('');
    } else {
      this.props.setTaskFormError(taskFormValidation(this.state));
    }

    this.setState({
      task: '',
    });
  }

  /**
  * Renders an html form template to task form
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { taskFormError } = this.props.error;
    return (

      <div>
        <form className='col s12' onSubmit={this.handleSubmit}>
          {
            this.state.task === '' && taskFormError ?
              <div className='red-text'>
                {taskFormError}
              </div>
              :
              null
          }
          <div className='row col s12 m6 l6'>
            <div className='input-field'>
              <input
                className='validate black-text'
                type='text'
                id='todolist'
                name='task'
                maxLength='65'
                placeholder='Create Your Tasks'
                value={this.state.task}
                onChange={this.handleChange}
              />
            </div>

            <div className='custom-radios'>

              <Tooltip
                placement='top'
                overlay='Normal Task'
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <div>
                  <input
                    name='priority'
                    type='radio'
                    id='normal'
                    value='normal'
                  />
                  <label className='radio-label' htmlFor='normal'>
                    <span>
                      <img
                        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg'
                        alt='Checked Icon'
                      />
                    </span>
                  </label>
                </div>
              </Tooltip>

              <Tooltip
                placement='top'
                overlay='Critical Task'
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <div>
                  <input
                    name='priority'
                    type='radio'
                    id='critical'
                    value='critical'
                  />
                  <label className='radio-label' htmlFor='critical'>
                    <span>
                      <img
                        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg'
                        alt='Checked Icon'
                      />
                    </span>
                  </label>
                </div>
              </Tooltip>

              <Tooltip
                placement='top'
                overlay='Urgent Task'
                arrowContent={<div className='rc-tooltip-arrow-inner' />}
              >
                <div>
                  <input
                    name='priority'
                    type='radio'
                    id='urgent'
                    value='urgent'
                  />
                  <label className='radio-label' htmlFor='urgent'>
                    <span>
                      <img
                        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg'
                        alt='Checked Icon'
                      />
                    </span>
                  </label>
                </div>
              </Tooltip>

              <div className='input-field add-task'>
                <button
                  className='btn waves-effect waves-light app-btn'
                  type='submit'
                  name='action'
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

TaskForm.propTypes = {
  createTask: React.PropTypes.func.isRequired,
  getTasks: React.PropTypes.func.isRequired,
  todoId: React.PropTypes.string.isRequired,
  setTaskFormError: React.PropTypes.func.isRequired,
  error: PropTypes.Object,
};

TaskForm.defaultProps = {
  error: {
    taskFormError: ''
  }
};

const mapStateToProps = state => ({
  error: state.error
});

const matchDispatchToProps = dispatch => bindActionCreators({
  createTask,
  getTasks,
  setTaskFormError
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(TaskForm);


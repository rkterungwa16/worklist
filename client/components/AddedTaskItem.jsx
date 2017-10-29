import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  checkPriority,
  checkCompletion
} from '../helper/taskVariableCheck';
import {
  completeTask
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
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
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
        value: 'completed'
      });
      this.props.completeTask({
        id: this.props.tasks._id,
        completed: true
      });
    }
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

AddedTaskItem.propTypes = {
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
  completeTask
}, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(AddedTaskItem);

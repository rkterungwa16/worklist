import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import collaboratorFormValidation from '../helper/collaboratorFormValidation';
import {
  collaboratorError,
  addCollaborator
} from '../actions/actionCreators';

/**
* Edit profile form for the application
*/
class CollaboratorForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      todoId: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Update current form values when user inputs values
   * @param {*} event Html DOM object when register form is submitted
   * @return {*} null
   */
  handleChange(event) {
    event.preventDefault();
    const obj = {};
    obj[event.target.name] = event.target.value;
    obj.todoId = this.props.todoId;
    this.setState(obj);
  }

  /**
   * Submit current form values when user submits form
   * @param {*} event Html DOM object when register form is submitted
   * @return {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (collaboratorFormValidation(this.state) === true) {
      this.props.addCollaborator(this.state);
      this.setState({
        email: ''
      });
    } else {
      this.props.collaboratorError(collaboratorFormValidation(this.state));
    }
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { collaboratorFormError } = this.props.error;
    const { success } = this.props.collaborator;
    return (
      <form onSubmit={this.handleSubmit}>
        {
          collaboratorFormError ?
            <div className='red-text'>
              {collaboratorFormError}
            </div>
            :
            null
        }
        {
          success ?
            <div className='green-text'>
              {success.status}
            </div>
            :
            null
        }
        <div className='input-field'>
          <input
            className='validate'
            id='collaboratorEmail'
            name='email'
            type='email'
            placeholder='Collaborator Email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>

        <div className='center'>
          <button
            className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
            id='signup-btn'
            type='submit'
          >
            Add as Collaborator
          </button>
        </div>
      </form>
    );
  }
}

CollaboratorForm.propTypes = {
  addCollaborator: React.PropTypes.func.isRequired,
  collaboratorError: React.PropTypes.func.isRequired,
  todoId: React.PropTypes.string.isRequired,
  error: React.PropTypes.shape({
    collaboratorFormError: '' }).isRequired,
  collaborator: React.PropTypes.shape({
    success: {} }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  collaboratorError,
  addCollaborator
}, dispatch);

const mapStateToProps = state => ({
  error: state.error,
  collaborator: state.collaborator
});

export default connect(mapStateToProps,
  matchDispatchToProps)(CollaboratorForm);


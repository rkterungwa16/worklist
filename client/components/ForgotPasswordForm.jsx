import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  forgotPasswordFormValidation
} from '../helper/formValidation';
import {
  forgotPasswordError,
  sendEmailForReset
} from '../actions/userActionServices';

/**
* Edit profile form for the application
*/
class ForgotPasswordForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      email: ''
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
    if (forgotPasswordFormValidation(this.state) === true) {
      this.props.sendEmailForReset(this.state);
      this.setState({
        email: ''
      });
    } else {
      this.props.forgotPasswordError(forgotPasswordFormValidation(this.state));
    }
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { forgotPasswordFormError } = this.props.error;
    const { success } = this.props.forgotPassword;
    return (
      <form onSubmit={this.handleSubmit}>
        {
          forgotPasswordFormError ?
            <div className='red-text'>
              {forgotPasswordFormError}
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
            id='forgot-password'
            name='email'
            type='email'
            placeholder='Enter Your Email'
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
            Send Email
          </button>
        </div>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  sendEmailForReset: React.PropTypes.func.isRequired,
  forgotPasswordError: React.PropTypes.func.isRequired,
  todoId: React.PropTypes.string.isRequired,
  error: React.PropTypes.shape({
    forgotPasswordFormError: '' }).isRequired,
  forgotPassword: React.PropTypes.shape({
    success: {} }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  forgotPasswordError,
  sendEmailForReset
}, dispatch);

const mapStateToProps = state => ({
  error: state.error,
  forgotPassword: state.forgotPassword
});

export default connect(mapStateToProps,
  matchDispatchToProps)(ForgotPasswordForm);


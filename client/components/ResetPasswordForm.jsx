import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import resetPasswordFormValidation from '../helper/resetPasswordFormValidation';
import {
  passwordResetError,
  changePassword
} from '../actions/actionCreators';

/**
* Reset Password form for the application
*/
class ResetPasswordForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      confirmPassword: '',
      password: '',
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
    this.setState(obj);
  }

  /**
   * Submit current form values when user submits form
   * @param {*} event Html DOM object when register form is submitted
   * @return {*} null
   */
  handleSubmit(event) {
    event.preventDefault();
    if (resetPasswordFormValidation(this.state) === true) {
      this.props.changePassword(this.state);
    } else {
      this.props.passwordResetError(resetPasswordFormValidation(this.state));
    }
    this.setState({
      email: '',
      password: '',
      confirmPassword: ''
    });
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { resetPasswordFormError } = this.props.error;
    const { success } = this.props.resetPassword;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            resetPasswordFormError ?
              <div className='red-text'>
                {resetPasswordFormError}
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
          <div className='input-field'>
            <input
              className='validate'
              name='password'
              id='password'
              type='password'
              placeholder='Your new Password'
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className='input-field'>
            <input
              className='validate'
              id='confirmPassword'
              name='confirmPassword'
              type='password'
              placeholder='Confirm Your Password'
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>

          <div className='center'>
            <button
              className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
              type='submit'
            >
              Reset Password
            </button>
          </div>

          <div className='center'>
            <Link
              to={'/login'}
              className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
              id='edit-back-btn'
              type='submit'
            >
            Login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

ResetPasswordForm.propTypes = {
  changePassword: React.PropTypes.func.isRequired,
  passwordResetError: React.PropTypes.func.isRequired,
  error: PropTypes.Object,
  resetPassword: PropTypes.Object,
};

ResetPasswordForm.defaultProps = {
  error: {
    todoFormError: ''
  },
  resetPassword: {
    success: {}
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({
  passwordResetError,
  changePassword
}, dispatch);

const mapStateToProps = state => ({
  error: state.error,
  resetPassword: state.resetPassword
});

export default connect(mapStateToProps,
  matchDispatchToProps)(ResetPasswordForm);


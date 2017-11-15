import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import signupFormValidation from '../helper/signupFormValidation';
import {
  setSignupError
} from '../actions/actionCreators';

/**
* Registration form for the application
*/
class SignupForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
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
    if (signupFormValidation(this.state) === true) {
      this.props.onSubmit(this.state);
    } else {
      this.props.setSignupError(signupFormValidation(this.state));
    }
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { signupError } = this.props.error;
    return (
      <form id='form-id' onSubmit={this.handleSubmit}>
        {
          signupError ?
            <div className='red-text'>
              {signupError}
            </div>
            :
            null
        }
        <div className='input-field'>
          <input
            className='validate'
            name='username'
            type='text'
            id='signup-username'
            placeholder='Your username'
            value={this.state.username}
            onChange={this.handleChange}
          />
        </div>
        <div className='input-field'>
          <input
            className='validate'
            id='signup-email'
            name='email'
            type='email'
            placeholder='Your email'
            value={this.state.email}
            onChange={this.handleChange}
          />
        </div>
        <div className='input-field'>
          <input
            className='validate'
            name='password'
            id='signup-password'
            type='password'
            placeholder='Your Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <button
          className='col s6 offset-s3  btn blue'
          id='signup-btn'
          type='submit'
        >
          Signup
        </button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  setSignupError: React.PropTypes.func.isRequired,
  error: React.PropTypes.shape({
    signupError: '' }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  setSignupError
}, dispatch);

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps,
  matchDispatchToProps)(SignupForm);


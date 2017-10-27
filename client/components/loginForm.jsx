import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import loginFormValidation from '../helper/loginFormValidation';
import {
  setLoginError
} from '../actions/actionCreators';


/**
* Login form form for the application
*/
class LoginForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
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
    if (loginFormValidation(this.state) === true) {
      this.props.onSubmit(this.state);
    } else {
      this.props.setLoginError(loginFormValidation(this.state));
    }
    this.setState({
      email: '',
      password: ''
    });
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { loginError } = this.props.error;
    return (
      <form onSubmit={this.handleSubmit}>
        {
          loginError ?
            <div className='red-text'>
              {loginError}
            </div>
            :
            null
        }
        <div className='input-field'>
          <input
            className='validate'
            id='email'
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
            id='password'
            name='password'
            type='password'
            placeholder='Your Password'
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <div className='center'>
          <button
            className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
            id='signup-btn'
            type='submit'
          >
            Login
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired,
  setLoginError: React.PropTypes.func.isRequired,
  error: React.PropTypes.shape({
    loginError: '' }).isRequired,
};

const matchDispatchToProps = dispatch => bindActionCreators({
  setLoginError
}, dispatch);

const mapStateToProps = state => ({
  error: state.error
});

export default connect(mapStateToProps,
  matchDispatchToProps)(LoginForm);


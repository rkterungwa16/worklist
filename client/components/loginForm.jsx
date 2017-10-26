import React, { Component } from 'react';


/**
* Registration form for the application
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
    this.props.onSubmit(this.state);
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
  onSubmit: React.PropTypes.func.isRequired
};

export default LoginForm;

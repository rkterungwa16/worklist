import React, { Component } from 'react';


/**
* Registration form for the application
*/
class RegisterForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Submit current form values when register form is submitted
   * @param {*} event Html DOM object when register form is submitted
   * @return {*} null
   */
  onSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    this.props.onSubmit(username, password, email);
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className='input-field'>
          <input
            className='validate'
            type='text'
            id='username'
            placeholder='Your username'
          />
        </div>
        <div className='input-field'>
          <input
            className='validate'
            id='email'
            type='email'
            placeholder='Your email'
          />
        </div>
        <div className='input-field'>
          <input
            className='validate'
            id='password'
            type='password'
            placeholder='Your Password'
          />
        </div>

        <div className='center'>
          <button
            className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
            id='signup-btn'
            type='submit'
          >
            Signup
          </button>
        </div>
      </form>
    );
  }
}

RegisterForm.propTypes = {
  onSubmit: React.PropTypes.func.isRequired
};

export default RegisterForm;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import editProfileFormValidation from '../helper/editProfileFormValidation';
import {
  editProfileError,
  editProfile
} from '../actions/actionCreators';

/**
* Edit profile form for the application
*/
class EditProfileForm extends Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      confirmPassword: '',
      password: '',
      currentPassword: ''
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
    if (editProfileFormValidation(this.state) === true) {
      this.props.editProfile(this.state);
    } else {
      this.props.editProfileError(editProfileFormValidation(this.state));
    }
  }


  /**
  * Renders an html form template to register user
  * @returns {object} returns an object representing an html form template
  */
  render() {
    const { editProfileFormError } = this.props.error;
    const { success } = this.props.profile;
    return (
      <div>
        {
          success ?
            <Redirect to='/dashboard' />
            :
            <form onSubmit={this.handleSubmit}>
              {
                editProfileFormError ?
                  <div className='red-text'>
                    {editProfileFormError}
                  </div>
                  :
                  null
              }
              <div className='input-field'>
                <input
                  className='validate'
                  name='username'
                  type='text'
                  id='username'
                  placeholder='Your new username'
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className='input-field'>
                <input
                  className='validate'
                  name='currentPassword'
                  id='currentPassword'
                  type='password'
                  placeholder='Your Current Password'
                  value={this.state.currentPassword}
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
                  EditProfile
                </button>
              </div>

              <div className='center'>
                <Link
                  to={'/dashboard'}
                  className='col s6 m6 l6 offset-s2 offset-m2 offset-l3 btn blue'
                  id='edit-back-btn'
                  type='submit'
                >
                  Go Back
                </Link>
              </div>
            </form>
        }
      </div>
    );
  }
}

EditProfileForm.propTypes = {
  editProfile: React.PropTypes.func.isRequired,
  editProfileError: React.PropTypes.func.isRequired,
  error: PropTypes.Object,
  profile: PropTypes.Object,
};

EditProfileForm.defaultProps = {
  error: {
    todoFormError: ''
  },
  profile: {
    success: false
  }
};

const matchDispatchToProps = dispatch => bindActionCreators({
  editProfileError,
  editProfile
}, dispatch);

const mapStateToProps = state => ({
  error: state.error,
  profile: state.profile
});

export default connect(mapStateToProps,
  matchDispatchToProps)(EditProfileForm);


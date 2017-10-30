import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditProfileForm from './EditProfileForm';
import { registerUser } from '../actions/actionCreators';

/**
* Registration form for the application
*/
class EditProfile extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);
  }

  /**
   * Register a new user
   * @param {string} userSignupInfo an object containing all of the users info
   * @return {*} null
   */
  register(userSignupInfo) {
    this.props.registerUser(userSignupInfo);
  }

  /**
   * Create an html template for register form background
   * @return {object} return object representing register form background
   */
  render() {
    return (
      <div>
        <div className='row center'>
          <div className='col s12 m5 l5 offset-s1 offset-m3 offset-l3'>
            <div className='card blue darken-1'>
              <div className='card-content black-text'>
                <div id='signup'>
                  <div className='row center' id='RegisterCard'>
                    <h4 className='center-align'>Edith Profile</h4>
                    <EditProfileForm
                      onSubmit={this.register}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  registerUser: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  registerUser }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(EditProfile);

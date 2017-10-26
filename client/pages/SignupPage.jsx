import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import GoogleSignup from '../components/GoogleSignup';
import { registerUser } from '../actions/actionCreators';

/**
* Registration form for the application
*/
class Register extends React.Component {
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
    const { loggedIn } = this.props.currentState.authenticated;
    return (
      <div>
        {
          loggedIn ?
            <Redirect to='/dashboard' />
            :
            <div className='row center'>
              <div className='col s12 m5 l5 offset-s1 offset-m3 offset-l3'>
                <h3 className='card-title'>WorkList</h3>
                <div className='card blue-grey lighten-1'>
                  <div className='card-content black-text'>
                    <div id='signup'>
                      <div className='row center' id='RegisterCard'>
                        <h4 className='center-align'>Signup</h4>
                        <SignupForm
                          onSubmit={this.register}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='card-action white-text'>
                    <p
                      className='margin center medium-small sign-up'
                    >
                  Already have an account?
                      <Link
                        to='/login'
                        className='red-text'
                      >
                  Login
                      </Link>
                    </p>
                  </div>
                  <div className='card-action center'>
                    <GoogleSignup />
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

Register.propTypes = {
  currentState: React.PropTypes.shape({ Login: {
    formState: {},
    error: '',
    currentlySending: false },
  authenticated: {
    loggedIn: false
  } }).isRequired,
  registerUser: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  registerUser }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(Register);

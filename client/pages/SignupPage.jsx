import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import SignupForm from '../components/SignupForm';
import GoogleSignup from '../components/GoogleSignup';
import { registerUser } from '../actions/userActionServices';

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
              <div className='col s12 m6 l4 offset-s1 offset-m3 offset-l4 card white'>
                <div className='card-content black-text'>
                  <a className='brand-logo black-text center'>
                    <img
                      className='sigu-brand'
                      width='120'
                      src='https://res.cloudinary.com/doy0uyv63/image/upload/v1510831655/Logomakr_8muXoA_ltajyd.png'
                      alt=''
                    />
                  </a>

                  <h4 className='center-align'>Signup</h4>
                  <SignupForm
                    onSubmit={this.register}
                  />
                </div>
                <div className='card-action black-text'>
                  <p
                    className='margin center medium-small sign-up'
                  >
                Already have an account?
                    <Link
                      to='/login'
                      className='login-txt red-text'
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

        }
      </div>
    );
  }
}

Register.propTypes = {
  currentState: React.PropTypes.shape({
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

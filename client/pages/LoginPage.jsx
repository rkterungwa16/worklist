import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../actions/userActionServices';

/**
* Registration form for the application
*/
class Login extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  /**
   * Login a registered user
   * @param {string} userLoginInfo a registered users password and email\
   * @return {*} null
   */
  login(userLoginInfo) {
    this.props.loginUser(userLoginInfo);
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
                  <div className='row' id='RegisterCard'>
                    <h4 className='center-align'>Login</h4>
                    <LoginForm
                      onSubmit={this.login}
                    />
                  </div>
                </div>
                <div className='card-action'>
                  <div className='row'>
                    <div className='input-field col s6 m6 l6'>
                      <p className='margin medium-small'>

                        <Link
                          to={'/'}
                          className='red-text'
                        >
                          Register Now!
                        </Link>
                      </p>
                    </div>
                    <div className='input-field col s6 m6 l6'>
                      <p className='margin right-align medium-small'>
                        <Link
                          className='black-text forgot-password'
                          to={'/forgot-password'}
                        >
                          Forgot password?
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  currentState: React.PropTypes.shape({ Login: {
    formState: {},
    error: '',
    currentlySending: false },
  authenticated: {
    loggedIn: false
  } }).isRequired,
  loginUser: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  loginUser }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(Login);

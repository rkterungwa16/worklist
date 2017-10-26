import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/LoginForm';
import { loginUser } from '../actions/actionCreators';

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
              <div className='col s12 m5 l5 offset-s1 offset-m2 offset-l3'>
                <div className='card blue-grey lighten-1'>
                  <div className='card-content black-text'>
                    <span className='card-title'>WorkList</span>
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
                            className='white-text'
                            to={'/forgotPassword'}
                          >
                            Forgot password?
                          </Link>
                        </p>
                      </div>
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

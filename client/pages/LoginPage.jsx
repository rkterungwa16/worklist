import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from '../components/loginForm';
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
   * Register a new user
   * @param {string} password new users's password
   * @param {string} email new user's email
   * @return {*} null
   */
  login(password, email) {
    this.props.loginUser({ password, email });
  }

  /**
   * Create an html template for register form background
   * @return {object} return object representing register form background
   */
  render() {
    console.log(this.props);
    const { dispatch } = this.props;
    const { formState } = this.props.currentState.Login;

    return (
      <div>
        <div className='row center'>
          <div className='col s12 m6 l6 offset-s1 offset-m2 offset-l3'>
            <div className='card blue-grey darken-1'>
              <div className='card-content black-text'>
                <span className='card-title'>WorkList</span>
                <div className='row' id='RegisterCard'>
                  <h4 className='center-align'>Login</h4>
                  <LoginForm
                    formState={formState}
                    dispatch={dispatch}
                    onSubmit={this.login}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  currentState: React.PropTypes.shape({ Login: {
    formState: {},
    error: '',
    currentlySending: false },
  login: {
    loggedIn: false
  } }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  loginUser: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  loginUser }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(Login);

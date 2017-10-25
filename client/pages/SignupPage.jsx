import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SignupForm from '../components/signupForm';
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
   * @param {string} username new user's username
   * @param {string} password new users's password
   * @param {string} email new user's email
   * @return {*} null
   */
  register(username, password, email) {
    this.props.registerUser({ username, password, email });
  }

  /**
   * Create an html template for register form background
   * @return {object} return object representing register form background
   */
  render() {
    console.log(this.props);
    const { dispatch } = this.props;
    const { formState } = this.props.currentState.Signup;

    return (
      <div className='row center'>
        <div className='col s12 m6 l6 offset-s1 offset-m2 offset-l3'>
          <div className='card blue-grey darken-1'>
            <div className='card-content black-text'>
              <span className='card-title'>WorkList</span>
              <div id='signup'>
                <div className='row' id='RegisterCard'>
                  <h4 className='center-align'>Signup</h4>
                  <SignupForm
                    formState={formState}
                    dispatch={dispatch}
                    onSubmit={this.register}
                  />
                </div>
              </div>
            </div>
            <div className='card-action'>
              <GoogleSignup />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  currentState: React.PropTypes.shape({ Signup: {
    formState: {},
    error: '',
    currentlySending: false },
  login: {
    loggedIn: false
  } }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  registerUser: React.PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  registerUser }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(Register);

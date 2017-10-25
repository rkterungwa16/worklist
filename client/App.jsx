/* global $ */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './components/Header';
import SignupPage from './pages/SignupPage';

/**
* Application Home page
* @param {object} props application props
* @return {obj} a template of the application home page.
*/

/**
* Registration form for the application
*/
class App extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.check = '';
  }

  /**
   * A react lifecycle method
   * Get all groups of a user when this component mounts
   * @memberof Login
   * @return {*} null
   */
  componentDidMount() {
    this.check = true;
    $('ul.tabs').tabs();
  }

  /**
   * Create an html template for register form background
   * @return {object} return object representing register form background
   */
  render() {
    const { loggedIn } = this.props.currentState.Signup;
    return (
      <div>
        <Header />
        {
          loggedIn ?
            <Redirect to='/dashboard' />
            :
            <SignupPage />
        }
      </div>
    );
  }
}

App.propTypes = {
  currentState: React.PropTypes.shape({ Signup: {
    formState: {},
    error: '',
    currentlySending: false },
  login: {
    loggedIn: false
  } }).isRequired,
};

const mapStateToProps = state => ({
  currentState: state
});

// const matchDispatchToProps = dispatch => bindActionCreators({
//   registerUser }, dispatch);

// export default connect(mapStateToProps,
//   matchDispatchToProps)(App);

export default connect(mapStateToProps)(App);


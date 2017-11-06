import React from 'react';
import GoogleLogin from 'react-google-login';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { googleSignup } from '../actions/actionCreators';

/**
* Google signup component
*/
class GoogleSignup extends React.Component {
  /**
  * @param {objec} props Represents the state of the application
  */
  constructor(props) {
    super(props);
    this.googleResponse = this.googleResponse.bind(this);
  }

  /**
   * Method to execute on click on google signup button
   * @param {object} response Object of google user details
   * @return {*} null
   */
  googleResponse(response) {
    console.log('GOOGLE TOKEN OBJECT', response.tokenObj.id_token);
    this.props.googleSignup({ id_token: response.tokenObj.id_token });
  }

  /**
  * Renders an html form template to create groups
  * @returns {object} return object representing a google signup button
  */
  render() {
    return (
      <GoogleLogin
        clientId='170866267321-gsutr8128dndq2cbftoea7n4tdagftom.apps.googleusercontent.com'
        buttonText='Google Login'
        onSuccess={this.googleResponse}
        onFailure={this.googleResponse}
      />
    );
  }
}

GoogleSignup.propTypes = {
  googleSignup: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  currentState: state
});

const matchDispatchToProps = dispatch => bindActionCreators({
  googleSignup }, dispatch);

export default connect(mapStateToProps,
  matchDispatchToProps)(GoogleSignup);


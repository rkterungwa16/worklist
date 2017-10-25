import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';

/**
 * Ensure successfull google sign up
 * @param  {boolean} value true means the group has been created hence route redirected.
 * @return {object} action type and data
 */
export const googleSignupSuccess = value => ({
  type: 'GOOGLE_SIGNUP_SUCCESS',
  value
});

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 * @return {object} action type and data
 */
export const setAuthState = newAuthState => ({ type: 'SET_AUTH', newAuthState });

/**
 * Updates the form state when registering a user
 * @param  {boolean} newFormState means a user is registered, false means no user is logged in
 * @return {object} action type and data
 */
export const changeRegisterForm = newFormState => ({
  type: 'CHANGE_REGISTER_FORM',
  newFormState
});

/**
 * Updates the form state when creating a todo list
 * @param  {boolean} newFormState means a user is registered, false means no user is logged in
 * @return {object} action type and data
 */
export const changeRegisterForm = newFormState => ({
  type: 'CHANGE_REGISTER_FORM',
  newFormState
});

/**
 * Get user todo lists
 * @param  {boolean} values user created todo lists
 * @return {object} action type and data
 */
export const getTodoLists = values => ({
  type: 'GET_TODOLISTS',
  values
});

/**
 * Updates the user login form
 * @param  {object} newFormState update form input values
 * @return {object} action type and data
 */
export const changeLoginForm = newFormState => ({
  type: 'CHANGE_LOGIN_FORM',
  newFormState
});

/**
 * Tells the app we want to register a user
 * @param  {object} data The data we're sending for registration
 * @param  {string} data.username The username of the user to register
 * @param  {string} data.password The password of the user to register
 * @return {object} server response
 */

export const registerUser = data => (dispatch) => {
  return axios.post('/api/v1/user/signup', data)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthState(true));
    });
};

/**
 * Tells the app we want to login a user using google
 * @param  {object} userData The data we're sending for login
 * @param  {string} userData.username The username of the user to login
 * @param  {string} userData.email The password of the user to login
 * @return {object} action type and data
 */

export const googleSignup = userData => (dispatch) => {
  return axios.post('/api/v1/auth/google', userData)
    .then((response) => {
      console.log('RESPONSE FROM GOOGLE SIGNUP', response);
      dispatch(googleSignupSuccess(true));
    });
};

/**
 * Tells the app we want to login a user
 * @param  {object} userData The data we're sending for login
 * @param  {string} userData.username The username of the user to login
 * @param  {string} userData.password The password of the user to login
 * @return {object} action type and data
 */

export const loginUser = userData => (dispatch) => {
  return axios.post('/api/v1/user/login', userData)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthState(true));
    });
};

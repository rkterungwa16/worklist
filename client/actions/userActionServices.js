import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';
import axiosConfig from '../helper/axiosConfig';
import {
  setAuthState,
  setSignupError,
  setLoginError,
  emailSuccess,
  forgotPasswordError,
  passwordResetError,
  passwordResetSuccess,
  profileChangeSuccess,
  editProfileError,
  getUser
} from './actionCreators';
/**
 * Tells the app we want to register a user
 * @param  {object} userInfo The data we're sending for registration
 * @param  {string} userInfo.username The username of the user to register
 * @param  {string} userInfo.password The password of the user to register
 * @return {object} server response
 */

export const registerUser = userInfo => (dispatch) => {
  return axios.post('/api/v1/user/signup', userInfo)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthState(true));
    })
    .catch((err) => {
      dispatch(setSignupError('This account is already registered, Please login'));
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
      localStorage.setItem('token', response.data.token);
      dispatch(setAuthState(true));
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
    })
    .catch((err) => {
      dispatch(setLoginError(err.response.data));
    });
};


/**
 * Change a registered user password
 * @param  {object} email The data we're sending to change user password
 * @return {object} action type and data
 */

export const sendEmailForReset = email => (dispatch) => {
  return axios.post('/api/v1/resetEmail', email)
    .then((response) => {
      dispatch(emailSuccess(response.data));
    })
    .catch((error) => {
      dispatch(forgotPasswordError(error.response.data));
    });
};

/**
 * Change a registered user password
 * @param  {object} userData The data we're sending to change user password
 * @param  {string} userData.password The new password
 * @return {object} action type and data
 */

export const changePassword = userData => (dispatch) => {
  return axios.post('/api/v1/changePassword', userData)
    .then((response) => {
      dispatch(passwordResetSuccess(response.data));
    })
    .catch((error) => {
      dispatch(passwordResetError(error.response.data));
    });
};

/**
 * Edit the profile of a user
 * @param  {object} profile The information about profile to be updated
 * @return {object} server response
 */

export const editProfile = profile => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.post(`/api/v1/user/profile/${id}`, profile, config)
    .then((response) => {
      dispatch(profileChangeSuccess(true));
    })
    .catch((err) => {
      dispatch(editProfileError(err.response.data));
    });
};

/**
 * Edit the profile of a user
 * @param  {object} imageUrl The information about profile to be updated
 * @return {object} server response
 */

export const profilePicture = imageUrl => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  const picture = {
    imageUrl
  };
  return axios.post(`/api/v1/user/profilePicture/${id}`, picture, config)
    .then((response) => {
      dispatch(profileChangeSuccess(true));
    })
    .catch((err) => {
      dispatch(editProfileError(err.response.data));
    });
};

/**
 * Get a users
 * @return {object} server response
 */

export const getCurrentUser = () => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.get(`/api/v1/user/${id}`, config)
    .then((response) => {
      dispatch(getUser(response.data));
    });
};


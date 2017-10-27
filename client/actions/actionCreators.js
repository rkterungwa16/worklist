import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';
import axiosConfig from '../helper/axiosConfig';

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
 * Set the signup  error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const setSignupError = value => ({
  type: 'SET_SIGNUP_ERROR',
  value
});

/**
 * Set the login  error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const setLoginError = value => ({
  type: 'SET_LOGIN_ERROR',
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
 * Get user todo list
 * @param  {boolean} value user created todo lists
 * @return {object} action type and data
 */
export const getTodoLists = value => ({
  type: 'GET_TODOLISTS',
  value
});

/**
 * Get user tasks for each todo
 * @param  {boolean} value user created todo lists
 * @return {object} action type and data
 */
export const getTasksAction = value => ({
  type: 'GET_TASKS',
  value
});

/**
 * Get user tasks for each todo
 * @param  {boolean} value user created todo lists
 * @return {object} action type and data
 */
export const getTodoItem = value => ({
  type: 'GET_TODO_ITEM_ID',
  value
});

/**
 * Confirm that todo has been created
 * @param  {boolean} value boolean to confirm to creation
 * @return {object} action type and data
 */
export const todoCreated = value => ({
  type: 'CREATE_TODO',
  value
});

/**
 * Update the todo list
 * @param  {array} value an array of todos
 * @return {object} action type and data
 */
export const updateTodoList = value => ({
  type: 'UPDATE_TODO',
  value
});

/**
 * Confirm that task has been created
 * @param  {boolean} value boolean to confirm to creation
 * @return {object} action type and data
 */
export const taskCreated = value => ({
  type: 'CREATE_TASK',
  value
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

/**
 * Todo just created by a user
 * @param  {object} todo an object of the created todo
 * @return {object} server response
 */

export const createTodo = todo => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.post(`/api/v1/todolist/${id}`, todo, config)
    .then((response) => {
      console.log('TODO DATA', response.data);
      dispatch(todoCreated(response.data));
    });
};

/**
 * Get a users todo list
 * @return {object} server response
 */

export const getTodoList = () => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.get(`/api/v1/todolist/${id}`, config)
    .then((response) => {
      dispatch(getTodoLists(response.data));
    });
};

/**
 * Tells the app we want to create a task for a todo
 * @param  {object} task The task just created by the user
 * @param  {object} todoId The id for a todo
 * @return {object} server response
 */

export const createTask = (task, todoId) => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.post(`/api/v1/tasks/${id}/${todoId}`, task, config)
    .then((response) => {
      dispatch(taskCreated(response.data));
    });
};

/**
 * Get todo list of a user
 * @param  {object} todoId The id of todo we're getting tasks for
 * @return {object} server response
 */

export const getTasks = todoId => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.get(`/api/v1/tasks/${id}/${todoId}`, config)
    .then((response) => {
      dispatch(getTasksAction(response.data));
    });
};

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
export const getTodoItemId = value => ({
  type: 'GET_TODO_ITEM_ID',
  value
});

/**
 * Confirm that todo has been created
 * @param  {boolean} values boolean to confirm to creation
 * @return {object} action type and data
 */
export const todoCreated = values => ({
  type: 'TODO_CREATED_SUCCESSFULLY',
  values
});

/**
 * Confirm that task has been created
 * @param  {boolean} values boolean to confirm to creation
 * @return {object} action type and data
 */
export const taskCreated = values => ({
  type: 'TODO_CREATED_SUCCESSFULLY',
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
 * Updates the form state when creating a todo list
 * @param  {boolean} newFormState means a user is registered, false means no user is logged in
 * @return {object} action type and data
 */
export const createTodoListForm = newFormState => ({
  type: 'CREATE_TODOLIST_FORM',
  newFormState
});

/**
 * Updates the form state when creating a task for a todo list
 * @param  {boolean} newFormState means a user is registered, false means no user is logged in
 * @return {object} action type and data
 */
export const createTaskForm = newFormState => ({
  type: 'CREATE_TASK_FORM',
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
      console.log(response.data);
      dispatch(setAuthState(true));
    });
};

/**
 * Tells the app we want to create a todo list
 * @param  {object} data The data we're sending for registration
 * @param  {string} data.todo The username of the user to register
 * @return {object} server response
 */

export const createTodo = data => (dispatch) => {
  return axios.post('/api/v1/todolist', data)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(todoCreated(true));
    });
};

/**
 * Get todo list of a user
 * @param  {object} data The data we're sending for task creation
 * @param  {string} data.task The task to be performed
 * @param  {string} data.priority The priority of the task to be performed
 * @return {object} server response
 */

export const getTodoList = data => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  return axios.get(`/api/v1/todolist/${id}`, data, config)
    .then((response) => {
      dispatch(getTodoLists(response.data));
    });
};

/**
 * Tells the app we want to create a task for a todo
 * @param  {object} data The data we're sending for task creation
 * @param  {string} data.task The task to be performed
 * @param  {string} data.priority The priority of the task to be performed
 * @return {object} server response
 */

export const createTask = data => (dispatch) => {
  return axios.post('/api/v1/task', data)
    .then((response) => {
      localStorage.setItem('token', response.data.token);
      dispatch(taskCreated(true));
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
  return axios.get(`/api/v1/tasks/${id}/${todoId}`, todoId, config)
    .then((response) => {
      dispatch(getTasksAction(response.data));
    });
};

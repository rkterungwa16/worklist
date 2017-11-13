import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';
import axiosConfig from '../helper/axiosConfig';

/**
 * Ensure successfull google sign up
 * @param  {boolean} value true means the group has been created hence route redirected.
 * @return {object} action type and data
 */
export const profileChangeSuccess = value => ({
  type: 'CHANGE_PROFILE_SUCCESS',
  value
});

/**
 * Sets the `currentlySending` state, which displays a loading indicator during requests
 * @param  {boolean} value True means we're sending a request, false means we're not
 * @return {object} action type and data
 */
export const sendingRequest = value => ({ type: 'SENDING_REQUEST', value });

/**
 * Ensure successfull user log out
 * @param  {boolean} value true means the group has been created hence route redirected.
 * @return {object} action type and data
 */
export const userLogout = value => ({
  type: 'USER_LOGOUT',
  value
});

/**
 * Ensure successfull adding of collaborator
 * @param  {boolean} value true means collaborator was successfully added.
 * @return {object} action type and data
 */
export const collaboratorSuccess = value => ({
  type: 'ADDED_COLLABORATOR_SUCCESS',
  value
});

/**
 * Set reset password form error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const passwordResetError = value => ({
  type: 'PASSWORD_RESET_FORM_ERROR',
  value
});

/**
 * Ensure successfull email sent
 * @param  {boolean} value true means the email was successfully sent
 * @return {object} action type and data
 */
export const passwordResetSuccess = value => ({
  type: 'PASSWORD_RESET_SUCCESS',
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
 * Set edit profile error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const editProfileError = value => ({
  type: 'SET_EDIT_PROFILE_ERROR',
  value
});

/**
 * Set collaborator form error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const collaboratorError = value => ({
  type: 'COLLABORATOR_FORM_ERROR',
  value
});

/**
 * Set the todo form  error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const setTodoFormError = value => ({
  type: 'SET_TODO_FORM_ERROR',
  value
});

/**
 * Set the todo form  error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const setTaskFormError = value => ({
  type: 'SET_TASK_FORM_ERROR',
  value
});

/**
 * Sets the authentication state of the application
 * @param  {boolean} newAuthState True means a user is logged in, false means no user is logged in
 * @return {object} action type and data
 */
export const setAuthState = newAuthState => ({ type: 'SET_AUTH', newAuthState });

/**
 * Confirms that a task is deleted
 * @param  {boolean} value True means a task is deleted
 * @return {object} action type and data
 */
export const deletedTask = value => ({ type: 'TASK_IS_DELETED', value });

/**
 * Confirms that a task is being edited
 * @param  {boolean} value True means a task is being edited
 * @return {object} action type and data
 */
export const editingTask = value => ({ type: 'EDITING_TASK', value });

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
export const getTodoItemAction = value => ({
  type: 'GET_TODO_ITEM_ID',
  value
});

/**
 * Get current user
 * @param  {object} value user info
 * @return {object} action type and data
 */
export const getUser = value => ({
  type: 'GET_CURRENT_USER',
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
 * Task due date and creation date
 * @param  {boolean} value object of task with updated due date
 * @return {object} action type and data
 */
export const taskDueDate = value => ({
  type: 'TASK_CREATION_AND_DUE_DATE',
  value
});

/**
 * Update the status of a completed task
 * @param  {boolean} value boolean to update the status of the task
 * @return {object} action type and data
 */
export const taskCompleteUpdate = value => ({
  type: 'COMPLETE_TASK_UPDATE',
  value
});


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
 * Todo just created by a user
 * @param  {object} userTodo an object of the created todo
 * @return {object} server response
 */

export const createTodo = userTodo => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const config = axiosConfig(token);
  const todoInfo = {
    id,
    todo: userTodo.todo
  };
  return axios.post('/api/v1/todos/', todoInfo, config)
    .then((response) => {
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

/**
 * Get a todo item
 * @param {string} todoId the id of a todo
 * @return {object} server response
 */

export const getTodoItem = todoId => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  return axios.get(`/api/v1/todo/${todoId}`, config)
    .then((response) => {
      dispatch(getTodoItemAction(response.data));
    });
};

/**
 * Tells the app we want to create a task for a todo
 * @param  {object} task The task just created by the user
 * @param  {object} priority The priority level for each task
 * @param  {object} todoId The id for a todo
 * @return {object} server response
 */

export const createTask = (task, todoId, priority) => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const taskInfo = {
    id,
    todoId,
    task: task.task,
    priority
  };
  const config = axiosConfig(token);
  return axios.post('/api/v1/tasks/', taskInfo, config)
    .then((response) => {
      dispatch(taskCreated(response.data));
    });
};

/**
 * Tells the app we want to create a task for a todo
 * @param  {object} taskInfo Task info required to delete task
 * @return {object} server response
 */

export const deleteTask = taskInfo => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  return axios.delete(`/api/v1/deleteTask/${taskInfo.todoId}/${taskInfo.taskId}`, config)
    .then((response) => {
      dispatch(deletedTask(true));
    });
};

/**
 * Tells the app we want to update the complete state of a task
 * @param  {object} task The information about task to be updated
 * @return {object} server response
 */

export const completeTask = task => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  return axios.post('/api/v1/completeTask/', task, config)
    .then((response) => {
      dispatch(taskCompleteUpdate(response.data));
    });
};

/**
 * Perform the editing of a task
 * @param  {object} task The information about task to be edited
 * @return {object} server response
 */

export const editTask = (editedTask, taskId) => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  const taskInfo = {
    task: editedTask,
    taskId
  };
  return axios.put('/api/v1/edit/', taskInfo, config)
    .then((response) => {
      dispatch(editingTask(false));
    });
};

/**
 * Tells the app we want to update the task due date
 * @param  {object} task The information about task to be updated
 * @return {object} server response
 */

export const setTaskDueDate = task => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  return axios.post('/api/v1/dueDate/', task, config)
    .then((response) => {
      dispatch(taskDueDate(response.data));
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
 * Add a collaborator to a todo
 * @param  {object} email The information about profile to be updated
 * @return {object} server response
 */

export const addCollaborator = email => (dispatch) => {
  const token = localStorage.getItem('token') || null;
  const config = axiosConfig(token);
  return axios.post('/api/v1/collaborator/', email, config)
    .then((response) => {
      dispatch(collaboratorSuccess(response.data));
    })
    .catch((err) => {
      dispatch(collaboratorError('No data was sent to update'));
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

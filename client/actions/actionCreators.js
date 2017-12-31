
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
 * Set reset password form error
 * @param  {string} value a string representing the proper error type.
 * @return {object} action type and data
 */
export const forgotPasswordError = value => ({
  type: 'FORGOT_PASSWORD_FORM_ERROR',
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
 * Ensure successfull email sent
 * @param  {boolean} value true means the email was successfully sent
 * @return {object} action type and data
 */
export const emailSuccess = value => ({
  type: 'EMAIL_SUCCESS',
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


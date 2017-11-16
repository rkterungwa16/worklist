import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';
import axiosConfig from '../helper/axiosConfig';
import {
  taskCompleteUpdate,
  taskCreated,
  taskDueDate,
  deletedTask,
  editingTask,
  getTasksAction
} from './actionCreators';

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

import axios from 'axios';
import decodeJwt from 'jwt-decode';
import localStorage from 'localStorage';
import axiosConfig from '../helper/axiosConfig';
import {
  todoCreated,
  getTodoItemAction,
  getTodoLists,
  collaboratorError,
  collaboratorSuccess
} from './actionCreators';

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
      dispatch(collaboratorError(err.response.data));
    });
};

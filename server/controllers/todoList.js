import decodeJwt from 'jwt-decode';
import User from '../models/userModel';
import TodoList from '../models/todoListModel';
import Tasks from '../models/taskModel';

/**
* Create todo list
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const createTodoList = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const todo = req.body.todo;

  User.findById(id, (err, user) => {
    const todoList = {
      author: user._id,
      todo
    };
    new TodoList(todoList).save((err, newTodo) => {
      res
        .status(201)
        .send(newTodo);
    });
  });
};

/**
  * Create tasks for each todo list
  * @param {object} req for first parameter
  * @param {object} res for second parameter
  * @returns {object} a response object
  */
export const createTasks = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodeToken = decodeJwt(token);
  const todoId = req.params.todoid;
  const id = decodeToken.id;
  const task = req.body.task;
  const priority = req.body.priority;
  const dateCreated = new Date().getDate();
  const dueDate = new Date().setDate(30);

  const query = {
    _id: todoId,
    author: id
  };

  TodoList.findOne(query, (err, todolist) => {
    const defaultTask = {
      task,
      dateCreated,
      dueDate,
      priority
    };

    new Tasks(defaultTask).save((err, newtask) => {
      todolist.tasks.push(newtask);
      todolist.save();
      res
        .status(201)
        .json({
          status: 'task created', todolist
        });
    });
  });
};

/**
* Get todo lists
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const getTodoList = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;

  const query = {
    author: id
  };

  TodoList.find(query, (err, todolist) => {
    res
      .status(200)
      .send(todolist);
  });
};

/**
* Get tasks for each todo list
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const getTasks = (req, res) => {
  const token = req.headers['x-access-token'];
  const decodeToken = decodeJwt(token);
  const id = decodeToken.id;
  const todoId = req.params.todoid;

  const query = {
    _id: todoId,
    author: id
  };

  TodoList
    .find(query)
    .populate('tasks')
    .exec((err, tasks) => {
      res
        .status(200)
        .send(tasks[0].tasks);
    });
};


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
  const id = req.params.id;
  const todo = req.body.todo;

  User.findById(id, (err, user) => {
    const newTodo = {
      author: user._id,
      todo
    };
    new TodoList(newTodo).save((err, createdTodo) => {
      res
        .status(201)
        .json({
          createdTodo
        });
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
  const todoId = req.params.todoid;
  const id = req.params.id;
  const task = req.body.task.task;
  const priority = req.body.priority;
  const dateCreated = new Date().getDate();
  const dueDate = new Date().getDate();

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
          task: newtask,
          todolist
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
  const id = req.params.id;

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
  const id = req.params.id;
  const todoId = req.params.todoid;
  const query = {
    _id: todoId,
    author: id
  };

  TodoList
    .find(query)
    .populate('tasks')
    .exec((err, todo) => {
      res
        .status(200)
        .send(todo[0].tasks);
    });
};

/**
* Update tasks that are completed
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const completeTask = (req, res) => {
  const id = req.body.id;
  const completed = req.body.completed;
  const dateCreated = req.body.dateCreated;

  const query = {
    _id: id
  };
  const update = {
    completed,
    dateCreated
  };
  const options = { new: true };
  Tasks.findOneAndUpdate(query, update, options, (err, task) => {
    res
      .status(200)
      .send(task);
  });
};

/**
* Sets the date a task is due
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const taskDueDate = (req, res) => {
  const id = req.body.id;
  const dueDate = req.body.dueDate;

  const query = {
    _id: id
  };
  const update = {
    dueDate
  };
  const options = { new: true };
  Tasks.findOneAndUpdate(query, update, options, (err, task) => {
    res
      .status(200)
      .send(task);
  });
};

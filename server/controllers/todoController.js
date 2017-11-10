import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import User from '../models/userModel';
import TodoList from '../models/todoListModel';
import Tasks from '../models/taskModel';

/**
* Create todo list
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const createTodo = (req, res) => {
  const id = req.body.id;
  const todo = req.body.todo;
  User.findById(id, (err, user) => {
    if (!user) {
      return res.status(422).send('User does not exist');
    }
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
  const todoId = req.body.todoId;
  const id = req.body.id;
  const task = req.body.task;
  const priority = req.body.priority;
  const dateCreated = new Date().getDate().now;
  const dueDate = new Date().getDate().now;
  const completed = '';

  const query = {
    _id: todoId,
    $or: [
      {
        author: id
      },
      {
        collaborators: {
          _id: id
        }
      }
    ]
  };

  TodoList.findOne(query, (err, todos) => {
    if (!todos) {
      return res.status(422).send('Todo does not exist');
    }
    const currentTask = {
      task,
      dateCreated,
      dueDate,
      priority,
      completed
    };
    new Tasks(currentTask).save((err, newtask) => {
      todos.tasks.push(newtask);
      todos.save();
      res
        .status(201)
        .json({
          task: newtask,
          todos
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
    $or: [
      {
        author: id
      },
      {
        collaborators: {
          _id: id
        }
      }
    ]
  };

  TodoList.find(query, (err, todolist) => {
    if (!todolist) {
      return res.status(400)
        .send('This user does not have a todolist');
    }
    res
      .status(200)
      .send(todolist);
  });
};

/**
* Get todo lists
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const getTodoItem = (req, res) => {
  const id = req.params.todoId;
  const query = {
    _id: id
  };

  TodoList.findOne(query, (err, todo) => {
    if (!todo) {
      return res.status(400)
        .send('This todo does not exist');
    }
    res
      .status(200)
      .send(todo);
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
    $or: [
      {
        author: id
      },
      {
        collaborators: {
          _id: id
        }
      }
    ]
  };

  TodoList
    .find(query)
    .populate('tasks')
    .exec((err, todo) => {
      if (!todo) {
        return res.status(422)
          .send('Todo does not exist');
      }
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
    if (!task) {
      return res.status(422)
        .send('Task does not exist');
    }
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
    if (!task) {
      return res.status(422)
        .send('Task does not exist');
    }
    res
      .status(200)
      .send(task);
  });
};

/**
* Add a collaborator
* @param {object} req for first parameter
* @param {object} res for second parameter
* @returns {object} a response object
*/
export const addCollaborator = (req, res) => {
  const email = req.body.email;
  const todoId = req.body.todoId;
  const query = {
    email
  };

  User.findOne(query, (err, user) => {
    if (user) {
      TodoList.findOne({ _id: todoId }, (err, todo) => {
        todo.collaborators.push(user);
        todo.save();
        const transport = nodemailer.createTransport(smtpTransport({
          service: 'Gmail', // sets automatically host, port and connection security settings
          auth: {
            user: 'kombolpostitapp@gmail.com',
            pass: 'kombolPostIt'
          }
        }));
        const mailOptions = {
          to: email,
          from: 'kombol@Worklist.com',
          subject: 'Add you as a collaborator',
          html: `<h3>You have been added as a collaborator to [${todo.todo}].\n\n
          You can now create tasks for this todo</h3>`
        };
        transport.sendMail(mailOptions);
      });
      return res.status(201).send({ status: 'An email has been sent to the collaborator' });
    }
    res.status(201).send({ status: 'This user is not registered' });
  });
};

import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
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
export const createTodoList = (req, res) => {
  const id = req.params.id;
  const todo = req.body.todo;
  User.find({}, (err, allUsers) => {
  });
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
  TodoList.findOne(query, (err, todolist) => {
    const defaultTask = {
      task,
      dateCreated,
      dueDate,
      priority,
      completed
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

  // Get all todos for which I am the author
  // Get all todos for which I am a collaborator
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
    const token = jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),
      id: todoId }, process.env.SECRET_KEY);
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
      html: `<h4>You are receiving this because you (or someone else) has added you as a collaborator.\n\n
        Please click on the following link, or paste this into your browser to complete the process:</h4>
        <a
          href='http://${req.headers.host}/#/collaborator/${token}'
        >
        Sign Up
        </a>

        <h4>If you did not request this, please ignore this email and your password will remain unchanged.</h4>`
    };
    transport.sendMail(mailOptions);
    res.status(201).send({ status: 'An email has been sent to the collaborator' });
  });
};


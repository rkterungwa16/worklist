
import mongoose from 'mongoose';
import async from 'async';
import db from '../../../lib/db';
import config from '../../../config.json';
import User from '../../../models/userModel';
import Todo from '../../../models/todoListModel';
import userFixtures from '../fixtures/userMockData.json';
import todoFixtures from '../fixtures/todoMockData.json';

export const connect = (callback) => {
  db.connect(config.test.mongoUrl, callback);
};

// empty the database
export const reset = (callback) => {
  async.parallel([
    function emptyTodoCollection(cb) {
      Todo.remove({}, cb);
    },
    function emptyUsersCollection(cb) {
      User.remove({}, cb);
    }
  ], callback);
};

// populate the database with fixtures
export const populate = (callback) => {
  async.each(userFixtures, (data, next) => {
    User.create(new User({
      username: data.username,
      email: data.email,
      password: data.password
    }));
  }, (err) => {
    if (err) { return callback(err); }
    User.findOne({ username: 'johndoe' }, (err, user) => {
      if (err) { return callback(err); }

      async.each(todoFixtures, (data, next) => {
        const todo = new Todo(data);
        todo.userId = user._id;
        todo.save(next);
      }, callback);
    });
  });
};

// connect to, reset and populate database with fixtures
export const setupDatabase = (callback) => {
  const resetAndPopulate = (err) => {
    if (err) { return callback(err); }

    reset((err) => {
      if (err) { return callback(err); }
      populate(callback);
    });
  };

  if (mongoose.connection.db) {
    return resetAndPopulate();
  }
  connect();
};

import proxyquire from 'proxyquire';
import sinon from 'sinon';
import mongooseFunc from '../utils/helpers';

const mongoose = mongooseFunc();
describe('Todo list', () => {
  beforeEach(() => {
    const TodoList = proxyquire('../../../models/todoListModel', {
      mongoose
    });
  });

  it('should register the Mongoose model', () => {
    const value = mongoose.model.args[0][1] instanceof mongoose.Schema;
    expect(value).toBe(true);
  });

  describe('todo', () => {
    it('should be a string', () => {
      const obj = {};
      obj.todo = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('author', () => {
    it('should be an object', () => {
      const obj = {};
      obj.author = {
        type: mongoose.Schema.Types.ObjectId
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });

    it('should be unique', () => {
      const obj = {};
      obj.author = {
        ref: 'User'
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  // describe('tasks', () => {
  //   it('should be a string', () => {

  //     const obj = {};
  //     obj.tasks = [{
  //       type: mongoose.Schema.Types.ObjectId
  //     }];
  //     sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
  //   });
  // });
});


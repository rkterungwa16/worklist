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
    // mongoose.model.calledWith('User').toBe(true);
    console.log('USER MONGOOSE', mongoose.model.args);
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
    it('should be a string', () => {
      const obj = {};
      obj.author = {
        type: Object
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

  describe('password', () => {
    it('should be a string', () => {
      const obj = {};
      obj.password = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  // describe('image', () => {
  //   it('should be a buffer', () => {
  //     const obj = {};
  //     obj.image = {
  //       data: Buffer
  //     };
  //     sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
  //   });

  //   it('should have contentType of buffer to be a string', () => {
  //     const obj = {};
  //     obj.image = {
  //       contentType: String
  //     };
  //     sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
  //   });
  // });
});


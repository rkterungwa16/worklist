import proxyquire from 'proxyquire';
import sinon from 'sinon';
import mongooseFunc from '../utils/helpers';

const mongoose = mongooseFunc();

describe('User', () => {
  beforeEach(() => {
    const Task = proxyquire('../../../models/taskModel', {
      mongoose
    });
  });

  it('should register the Mongoose model', () => {
    console.log('USER MONGOOSE', mongoose.model.args);
    // mongoose.model.calledWith('User').toBe(true);
    const value = mongoose.model.args[0][1] instanceof mongoose.Schema;
    expect(value).toBe(true);
  });

  describe('task', () => {
    it('should be a string', () => {
      const obj = {};
      obj.task = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('due date', () => {
    it('should be a date', () => {
      const obj = {};
      obj.dueDate = {
        type: Date
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('date created', () => {
    it('should be a date', () => {
      const obj = {};
      obj.dateCreated = {
        type: Date
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('priority', () => {
    it('should be a string', () => {
      const obj = {};
      obj.priority = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('completed', () => {
    it('should be a boolean', () => {
      const obj = {};
      obj.completed = {
        type: Boolean
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });
});


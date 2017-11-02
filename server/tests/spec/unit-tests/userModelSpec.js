import proxyquire from 'proxyquire';
import sinon from 'sinon';
import mongooseFunc from '../utils/helpers';

const mongoose = mongooseFunc();

describe('User', () => {
  beforeEach(() => {
    const User = proxyquire('../../../models/userModel', {
      mongoose
    });
  });

  it('should register the Mongoose model', () => {
    const value = mongoose.model.args[0][1] instanceof mongoose.Schema;
    expect(value).toBe(true);
  });

  describe('username', () => {
    it('should be a string', () => {
      const obj = {};
      obj.username = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });

    it('should be unique', () => {
      const obj = {};
      obj.username = {
        unique: true
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });

    it('should be required', () => {
      const obj = {};
      obj.username = {
        required: true
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('email', () => {
    it('should be a string', () => {
      const obj = {};
      obj.email = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });

    it('should be unique', () => {
      const obj = {};
      obj.email = {
        unique: true
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });

    it('should be required', () => {
      const obj = {};
      obj.email = {
        required: true
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

  describe('salt', () => {
    it('should be a string', () => {
      const obj = {};
      obj.salt = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });

  describe('image', () => {
    it('should have contentType of buffer to be a string', () => {
      const obj = {};
      obj.image = {
        type: String
      };
      sinon.assert.called(mongoose.Schema.withArgs(sinon.match(obj)));
    });
  });
});


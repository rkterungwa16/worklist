import proxyquire from 'proxyquire';
// import User from '../../../models/userModel';
// import users from '../fixtures/userMockData.json';
import mongooseFunc from '../utils/helpers';

const mongoose = mongooseFunc();

describe('User', () => {
  beforeEach(() => {
    const User = proxyquire('../../../models/userModel', {
      mongoose
    });
  });

  it('should register the Mongoose model', () => {
    // mongoose.model.calledWith('User').toBe(true);
    const value = mongoose.model.args[0][1] instanceof mongoose.Schema;
    value.toBe(true);
  });
});

describe('User model', () => {
  it('Should connect to the DB', () => {
    //
  });
});

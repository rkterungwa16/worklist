import sinon from 'sinon';

const getMongooseStub = () => {
  const mongoose = {};
  mongoose.Schema = sinon.stub();
  mongoose.Schema.ObjectId = 'ObjectId';
  mongoose.Schema.prototype.plugin = sinon.stub();
  mongoose.model = sinon.stub();

  return mongoose;
};

export default getMongooseStub;

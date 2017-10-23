import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  image: {
    data: Buffer,
    contentType: String
  }
});

export default mongoose.model('User', User);

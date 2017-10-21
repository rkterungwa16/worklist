// import passportLocalMongoose from 'passport-local-mongoose';
import mongoose from 'mongoose';
// import validator from '../lib/validator';

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

// User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);

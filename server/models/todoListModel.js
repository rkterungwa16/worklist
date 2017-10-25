import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TodoList = new Schema({
  todo: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tasks'
  }]
});

export default mongoose.model('TodoList', TodoList);

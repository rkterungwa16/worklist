import mongoose from 'mongoose';
import tasks from './taskModel';

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

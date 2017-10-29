import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Tasks = new Schema({
  task: {
    type: String
  },
  dueDate: {
    type: Date
  },
  dateCreated: {
    type: Date
  },
  priority: {
    type: String
  },
  completed: {
    type: Boolean
  }
});

export default mongoose.model('Tasks', Tasks);

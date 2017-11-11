import { SENDING_REQUEST, CREATE_TASK,
  COMPLETE_TASK_UPDATE,
  GET_TASKS,
  TASK_CREATION_AND_DUE_DATE,
  TASK_IS_DELETED
} from '../actions/actionTypes';

const initialTaskState = {
  currentlySending: false,
  tasks: [],
  task: {},
  completed: {},
  taskDate: {},
  deleted: false
};

// The create group reducer
const createGroup = (state = initialTaskState, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case GET_TASKS:
      return { ...state, tasks: action.value };
    case CREATE_TASK:
      return { ...state, task: action.value };
    case TASK_CREATION_AND_DUE_DATE:
      return { ...state, taskDate: action.value };
    case COMPLETE_TASK_UPDATE:
      return { ...state, completed: action.value };
    case TASK_IS_DELETED:
      return { ...state, deleted: action.value };
    default:
      return state;
  }
};

export default createGroup;

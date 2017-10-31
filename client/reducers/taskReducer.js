import { SENDING_REQUEST, CREATE_TASK,
  COMPLETE_TASK_UPDATE,
  GET_TASKS,
  TASK_CREATION_AND_DUE_DATE
} from '../actions/actionTypes';

const initialGroupState = {
  currentlySending: false,
  tasks: [],
  task: {},
  completed: false,
  taskDate: {}
};

// The create group reducer
const createGroup = (state = initialGroupState, action) => {
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
    default:
      return state;
  }
};

export default createGroup;

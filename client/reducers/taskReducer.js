import { SENDING_REQUEST, CREATE_TASK,
  COMPLETE_TASK_UPDATE,
  GET_TASKS
} from '../actions/actionTypes';

const initialGroupState = {
  currentlySending: false,
  tasks: [],
  task: {},
  completed: false
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
    case COMPLETE_TASK_UPDATE:
      return { ...state, completed: action.value };
    default:
      return state;
  }
};

export default createGroup;

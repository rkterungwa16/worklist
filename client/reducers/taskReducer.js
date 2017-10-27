import { SENDING_REQUEST, CREATE_TASK,
  GET_TASKS
} from '../actions/actionTypes';

const initialGroupState = {
  currentlySending: false,
  tasks: [],
  task: {}
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
    default:
      return state;
  }
};

export default createGroup;

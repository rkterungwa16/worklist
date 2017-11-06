import { SENDING_REQUEST, CREATE_TODO, UPDATE_TODO,
  GET_TODO_ITEM_ID,
  GET_TODOLISTS
} from '../actions/actionTypes';

const initialGroupState = {
  currentlySending: false,
  todolists: [],
  todo: {},
  todoItem: {}
};

// The create group reducer
const createGroup = (state = initialGroupState, action) => {
  switch (action.type) {
    case SENDING_REQUEST:
      return { ...state, currentlySending: action.sending };
    case GET_TODOLISTS:
      return { ...state, todolists: action.value };
    case UPDATE_TODO:
      return { ...state, todolists: action.value };
    case GET_TODO_ITEM_ID:
      return { ...state, todo: action.value };
    case CREATE_TODO:
      return { ...state, todoItem: action.value };
    default:
      return state;
  }
};

export default createGroup;


import { GET_CURRENT_USER } from '../actions/actionTypes';

const initialUserState = {
  user: {}
};

const user = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, user: action.value };
    default:
      return state;
  }
};

export default user;

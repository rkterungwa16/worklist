import { USER_LOGOUT } from '../actions/actionTypes';

const Logout = {
  loggedOut: false
};

const authenticated = (state = Logout, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return { ...state, loggedOut: action.value };
    default:
      return state;
  }
};

export default authenticated;

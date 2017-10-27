import { SET_AUTH } from '../actions/actionTypes';

const initialAuthState = {
  loggedIn: false
};

const authenticated = (state = initialAuthState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    default:
      return state;
  }
};

export default authenticated;

import { SET_AUTH } from '../actions/actionTypes';

const initialLoginState = {
  loggedIn: false
};

const authenticated = (state = initialLoginState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, loggedIn: action.newAuthState };
    default:
      return state;
  }
};

export default authenticated;

import { GOOGLE_SIGNUP_SUCCESS } from '../actions/actionTypes';

const initialGoogleState = {
  success: false
};

// The user logout reducer
const googleSignup = (state = initialGoogleState, action) => {
  switch (action.type) {
    case GOOGLE_SIGNUP_SUCCESS:
      return { ...state, success: action.value };
    default:
      return state;
  }
};

export default googleSignup;

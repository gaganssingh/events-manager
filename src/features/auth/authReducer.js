import { SIGN_IN_USER, SIGN_OUT_USER } from "./authConstants";

const initialState = {
  // authenticated: false,
  // currentUser: null,
  authenticated: true,
  currentUser: {
    email: "test@test.com",
    photoURL: "/assets/user.png",
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...state,
        authenticated: true,
        currentUser: {
          email: action.payload.email,
          photoURL: "/assets/user.png",
        },
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default authReducer;

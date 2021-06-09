// import { combineReducers } from "redux";
// import authReducer from "../../features/auth/authReducer";
// import eventReducer from "../../features/events/eventReducer";
// import testReducer from "../../features/sandbox/testReducer";
// import modalReducer from "../common/modals/modalReducer";

// const rootReducer = combineReducers({
//   test: testReducer,
//   event: eventReducer,
//   modals: modalReducer,
//   auth: authReducer,
// });

// export default rootReducer;

import { combineReducers } from "redux";
import testReducer from "../../features/sandbox/testReducer";
import eventReducer from "../../features/events/eventReducer";
import modalReducer from "../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: modalReducer,
  auth: authReducer,
});

export default rootReducer;

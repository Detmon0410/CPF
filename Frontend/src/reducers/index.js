import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import authenticationReducer from "./authentication.reducer";

export default combineReducers({
  user: userReducer,
  authentication: authenticationReducer
});

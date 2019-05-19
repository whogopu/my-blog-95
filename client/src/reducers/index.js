import { combineReducers } from "redux";
import { postReducer } from "./postReducer";
import { authReducer } from "./authReducer";

export const rootReducers = combineReducers({
  postReducer,
  authReducer
});

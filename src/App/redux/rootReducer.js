import { combineReducers } from "redux";
import { userReducer } from "./Reducers/user.reducer";

const rootReducer = combineReducers({
  User: userReducer,
});

export default rootReducer;

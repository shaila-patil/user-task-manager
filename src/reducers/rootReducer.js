import { combineReducers } from "redux";
import { taskReducer } from "./taskReducer";
import { userReducer } from "./userReducer";
import filtersReducer from "./filtersReducer";

// Combine the reducers into a single root reducer
const rootReducer = combineReducers({
  tasks: taskReducer,
  users: userReducer,
  filters: filtersReducer,
});

export default rootReducer;

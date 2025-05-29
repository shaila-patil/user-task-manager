import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

// Create the Redux store with the root reducer and apply thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

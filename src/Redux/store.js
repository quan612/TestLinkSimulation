import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import asyncReducer from "./reducers";

const store = createStore(asyncReducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

export default store;

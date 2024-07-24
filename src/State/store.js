import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { usersReducers } from "./Auth/userReducer";

const rootReducers = combineReducers({
  usersReducers: usersReducers,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));

import { combineReducers } from "redux";

import tokenReducer from "./token";
import userReducer from "./user";

const reducers = combineReducers({
  token: tokenReducer,
  user: userReducer,
});

export default reducers;

import { combineReducers } from "redux";

import envReducer from "./env";
import userReducer from "./user";
import uidReducer from "./uid";
import sessionReducer from "./session";

const reducers = combineReducers({
    env: envReducer,
    user: userReducer,
    uid: uidReducer,
    session: sessionReducer,
})

export default reducers;
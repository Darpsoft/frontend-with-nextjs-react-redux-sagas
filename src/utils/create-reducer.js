import { combineReducers } from "redux";
import settings from "@redux/reducers/settings";
import auth from "@redux/reducers/auth";

export default function createReducer(asyncReducers) {
  return combineReducers({
    auth,
    settings,
    ...asyncReducers,
  });
}

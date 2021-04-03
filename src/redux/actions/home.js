import { REQUEST_HOME_START, REQUEST_HOME_SUCCESS } from "@redux/constants";

export const requestHomeStart = (payload) => ({
  type: REQUEST_HOME_START,
  payload,
});
export const requestHomeSuccess = (payload) => ({
  type: REQUEST_HOME_SUCCESS,
  payload,
});

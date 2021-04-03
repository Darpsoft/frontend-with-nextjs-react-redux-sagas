import { LOGIN_SUCCESS, SIGNOUT_SUCCESS } from "../constants";

export const initialState = {
  tokenUser: null,
  dataUser: {},
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return { ...state, ...action.payload };
    }
    case SIGNOUT_SUCCESS: {
      return { ...state, ...initialState };
    }
    default:
      return state;
  }
};
export default auth;

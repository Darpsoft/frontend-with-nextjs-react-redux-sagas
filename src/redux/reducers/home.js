import { REQUEST_HOME_SUCCESS } from "@redux/constants";

const initialState = {
  data: [],
  filter: {},
};

export function homeReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_HOME_SUCCESS:
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

export default homeReducer;

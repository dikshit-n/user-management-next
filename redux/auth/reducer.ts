import { AUTH_ACTION_TYPE, AUTH_PAYLOAD, AUTH_STATE } from "../../data";

const initialState: AUTH_STATE = {
  data: {
    token: null,
    type: null,
  },
  loading: false,
  error: null,
};

const authReducer = (
  state: AUTH_STATE = initialState,
  action: AUTH_PAYLOAD
): AUTH_STATE => {
  switch (action.type) {
    case AUTH_ACTION_TYPE.AUTHENTICATION_START:
      return { ...state, loading: true, error: null };
    case AUTH_ACTION_TYPE.AUTHENTICATION_SUCCESS:
      // 100% certainty that 'action' satisfies the
      // AUTHENTICATION_SUCCESS interface
      return { loading: false, error: null, data: { ...action.payload } };
    case AUTH_ACTION_TYPE.AUTHENTICATION_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case AUTH_ACTION_TYPE.AUTHENTICATION_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;

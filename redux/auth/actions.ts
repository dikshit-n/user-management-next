import { Dispatch } from "react";
import { AUTH_ACTION_TYPE, AUTH_PAYLOAD, AUTH_STATE_DATA } from "../../data";
import { axiosInstance } from "../../lib";

export const loginSuccessful = (data: AUTH_STATE_DATA) => ({
  type: AUTH_ACTION_TYPE.AUTHENTICATION_SUCCESS,
  payload: data,
});

export const checkauthStatus = () => {
  return async (dispatch: Dispatch<AUTH_PAYLOAD>) => {
    dispatch({ type: AUTH_ACTION_TYPE.AUTHENTICATION_START });
    try {
      let { data } = await axiosInstance.get("/checkauthstatus");
      data = { token: data.token, type: data.type };
      dispatch({
        type: AUTH_ACTION_TYPE.AUTHENTICATION_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ACTION_TYPE.AUTHENTICATION_FAILURE,
        payload: "Failed to load results",
      });
    }
  };
};

export const logout = () => ({
  type: AUTH_ACTION_TYPE.AUTHENTICATION_LOGOUT,
});

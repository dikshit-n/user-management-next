import axios from "axios";
import { getCookie } from "./cookies";

// creating axios instance
export const axiosInstance = axios.create({
  baseURL: "https://api.unotracker.com/api",
});

// setting token in header for each request
axiosInstance.interceptors.request.use(
  (config) => {
    let token = getCookie("token"); // getting token from cookies
    if (token && config.headers)
      config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// globally logout the user, if 401 occurs
// axiosInstance.interceptors.response.use(undefined, async (error) => {
//   // logout if unauthenticated or Token expired
//   if (error.response?.status === 401) {
//     // don't redirect to logout route if the path is '/' or the current page is a public page or login page
//     if (
//       window.location.pathname !== "/" &&
//       !window.location.href.includes("/public/") &&
//       !window.location.href.includes("/logout") &&
//       !window.location.href.includes("/auth")
//     )
//       window.location.href = "/logout";
//   }
//   return Promise.reject(error);
// });

// configuration to get upload progress(in percentage)

export var withUploadProgress = (callBack: (completed: any) => void) => {
  return {
    onUploadProgress: function (progressEvent: any) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      callBack(percentCompleted);
    },
  };
};

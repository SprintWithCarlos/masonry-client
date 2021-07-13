//USERS
export const LoginStart = (userCredentials) => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
export const Logout = () => ({
  type: "LOGOUT",
});
//POSTS
export const startFetchData = () => ({
  type: "START_FETCHING",
});
export const fetchingSuccess = (posts) => ({
  type: "FETCHING_SUCCESS",
  payload: posts,
});
export const fetchingError = (error) => ({
  type: "FETCHING_ERROR",
  payload: error,
});

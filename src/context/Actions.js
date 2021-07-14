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
export const toggleIsLoading = () => ({
  type: "TOGGLE_ISLOADING",
});
export const toggleIsValidated = () => ({
  type: "TOGGLE_ISVALIDATED",
});
export const sendError = (error) => ({
  type: "SEND_ERROR",
  payload: error,
});
export const reset = () => ({
  type: "RESET",
});
export const toggleModal = () => ({
  type: "TOGGLE_MODAL",
});
export const deleteStart = (id) => ({
  type: "DELETE_START",
});
export const successGetDelete = () => ({
  type: "SUCCESS_GET_DELETE",
});
export const failureGetDelete = (error) => ({
  type: "FAILURE_GET_DELETE",
  payload: error,
});

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("LOGIN_START");
      return {
        posts: state.posts,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      return {
        posts: state.posts,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      console.log("LOGIN_FAILURE");
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: action.payload,
      };
    case "LOGOUT":
      console.log("LOGOUT");
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: false,
      };
    case "START_FETCHING":
      console.log("START_FETCHING");
      return {
        posts: [],
        isFetching: true,
        error: false,
        user: state.user,
      };
    case "FETCHING_SUCCESS":
      console.log("FETCHING_SUCCESS");
      return {
        posts: action.payload,
        isFetching: false,
        error: false,
        user: state.user,
      };
    case "FETCHING_ERROR":
      console.log("FETCHING_ERROR");
      return {
        posts: [],
        isFetching: false,
        error: action.payload,
        user: state.user,
      };
    default:
      return state;
  }
};
export default Reducer;

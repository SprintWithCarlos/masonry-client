const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("LOGIN_START");
      return {
        posts: state.posts,
        user: null,
        isFetching: true,
        error: {},
        isLoading: false,
        isValidated: false,
      };
    case "LOGIN_SUCCESS":
      console.log("LOGIN_SUCCESS");
      return {
        posts: state.posts,
        user: action.payload,
        isFetching: false,
        error: {},
        isLoading: false,
        isValidated: false,
      };
    case "LOGIN_FAILURE":
      console.log("LOGIN_FAILURE");
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: action.payload,
        isLoading: false,
        isValidated: false,
      };
    case "LOGOUT":
      console.log("LOGOUT");
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: {},
        isLoading: false,
        isValidated: false,
      };
    case "START_FETCHING":
      console.log("START_FETCHING");
      return {
        posts: [],
        isFetching: true,
        error: {},
        user: state.user,
        isLoading: false,
        isValidated: false,
      };
    case "FETCHING_SUCCESS":
      console.log("FETCHING_SUCCESS");
      return {
        ...state,
        isFetching: !state.isFetching,
        posts: action.payload,
      };
    case "FETCHING_ERROR":
      console.log("FETCHING_ERROR");
      return {
        posts: [],
        isFetching: false,
        error: action.payload,
        user: state.user,
        isLoading: false,
        isValidated: false,
      };
    case "TOGGLE_ISLOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case "TOGGLE_ISVALIDATED":
      return {
        ...state,
        isValidated: !state.isValidated,
      };
    case "SEND_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "RESET":
      return {
        ...state,
        isValidated: false,
        error: false,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isActive: !state.isActive,
      };
    case "DELETE_START":
      console.log("DELETE_START");
      return {
        ...state,
        isFetching: true,
      };
    case "DELETE_SUCCESS":
      console.log("DELETE_SUCCESS");
      return {
        ...state,
        isFetching: false,
      };
    case "DELETE_FAILURE":
      console.log("DELETE_FAILURE");
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;

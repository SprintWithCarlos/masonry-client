const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        posts: state.posts,
        user: null,
        isFetching: true,
        error: false,
        isLoading: false,
        isValidated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        posts: state.posts,
        user: action.payload,
        isFetching: false,
        error: false,
        isLoading: false,
        isValidated: false,
      };
    case "LOGIN_FAILURE":
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: action.payload,
        isLoading: false,
        isValidated: false,
      };
    case "LOGOUT":
      return {
        posts: state.posts,
        user: null,
        isFetching: false,
        error: false,
        isLoading: false,
        isValidated: false,
      };
    case "START_FETCHING":
      return {
        posts: [],
        isFetching: true,
        error: false,
        user: state.user,
        isLoading: false,
        isValidated: false,
      };
    case "FETCHING_SUCCESS":
      return {
        posts: action.payload,
        isFetching: false,
        error: false,
        user: state.user,
        isLoading: false,
        isValidated: false,
      };
    case "FETCHING_ERROR":
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
      return {
        ...state,
        isFetching: true,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        isFetching: false,
      };
    case "DELETE_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default Reducer;

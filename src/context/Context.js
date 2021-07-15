import Reducer from "./Reducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  posts: [],
  isFetching: false,
  error: {},
  isLoading: false,
  isValidated: false,
  isActive: false,
};
export const Context = createContext(INITIAL_STATE);
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  return (
    <Context.Provider
      value={{
        posts: state.posts,
        isFetching: state.isFetching,
        error: state.error,
        isLoading: state.isLoading,
        isValidated: state.isValidated,
        isActive: state.isActive,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

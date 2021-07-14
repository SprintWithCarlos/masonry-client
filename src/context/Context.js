import Reducer from "./Reducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  posts: [],
  isFetching: false,
  error: false,
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
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

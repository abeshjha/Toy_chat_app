import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  user:null,
};
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

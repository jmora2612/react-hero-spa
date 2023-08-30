import { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

const init = () => {
  return JSON.parse(localStorage.getItem("user" || {}));
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  const login = (name = "") => {
    const action = {
      type: types.login,
      payload: {
        id: "ABC",
        name: name,
      },
    };

    dispatch(action);
  };

  const logout = () => {
    const action = {
      type: types.logout,
    };

    dispatch(action);
  };


  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(authState));
  }, [authState]);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

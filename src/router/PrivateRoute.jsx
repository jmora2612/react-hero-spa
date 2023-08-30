import { useContext, useMemo } from "react";
import { AuthContext } from "../auth";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { logged } = useContext(AuthContext);


  //uselocation permite acceder a la información de la ubicación actual 
  const { pathname, search } = useLocation();

  const lastPath = useMemo(() => pathname + search, [pathname, search]);

  localStorage.setItem('lastPath',lastPath)

  return logged ? children : <Navigate to="/login" />;
};

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/authSlice/authSlice";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  console.log("Protected routes component called");
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth,
  );
  console.log(
    "user ",
    user,
    "is authenticated ",
    isAuthenticated,
    "is loading ",
    isLoading,
  );
  useEffect(() => {
    dispatch(checkAuth());
    console.log("check auth function is called");
  }, [location.pathname]);

  if (!isAuthenticated && !isLoading) {
    if (!location.pathname.includes("/admin") ) {
      return <Navigate to="/login" />;

    }
    if (location.pathname.includes("/admin")) {
      return <Navigate to="/admin/login" />;
    }
  }
  if (isAuthenticated && !isLoading) {
    if (user.role == "user") {
      if (
        location.pathname.includes("/login") ||
        location.pathname.includes("/register") ||
        location.pathname.includes("/admin")
      ) {
        return <Navigate to="/" />;
      }

    }
    if (user.role == "admin") {
      if (
        (location.pathname.includes("/admin/login")) ||
        (location.pathname == "/") || (location.pathname == "/admin")
      ) {
        return <Navigate to="/admin/dashboard" />;
      }
    }
  } 
 
    return <div> {children} </div>;
  
};

export default ProtectedRoutes
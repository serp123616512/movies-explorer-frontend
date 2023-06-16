import React from 'react';
import { Navigate } from "react-router-dom";

const AuthProtectedRoute = ({component: Component, ...props}) => {
  return (
    props.loggedIn ? <Navigate to="/" replace={true}/> : <Component {...props} />
)}

export default AuthProtectedRoute;

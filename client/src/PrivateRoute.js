import React from "react";
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ children }) {
  
  const { currentUser } = useAuth();
  
  return currentUser ? children : <Redirect to="/Zaloguj" />;

}

import React, { useRef, useState, useEffect } from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext";

export default function PrivateRoute({ children }) {

  const { currentUser } = useAuth();
  const path = process.env.REACT_APP_PATH
  const [result, setResult] = useState(null);

  async function handleCheckAuthed(currentUser) {
    let isAdmin = false; 
  
    if (!currentUser) {
      return <Redirect to="/Zaloguj" />;
    } else {
      try {
        const response = await fetch(`${path}/admin-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: currentUser.email }),
        });
        const data = await response.json();
  
        if (data === "admin") {
          isAdmin = true;
        } else if (data === "user") {
          isAdmin = false;
        }
      } catch (e) {
        console.log(e);
      }
  
      if (isAdmin) {
        return "c"; 
      } else {
        return <Redirect to="/admin-login" />;
      }
    }
  }

  useEffect(() => {
    async function fetchData() {
      const result = await handleCheckAuthed(currentUser);
      setResult(result);
    }

    fetchData();
  }, [currentUser]);


if (result == "c"){
    return children;
}
else{
    return result;
}

// return result;

}
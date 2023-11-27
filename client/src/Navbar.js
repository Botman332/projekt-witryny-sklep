import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
  const path = process.env.REACT_APP_PATH;
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const [currentDbUser, setcurrentDbUser] = useState([]);
  const [currentDbUserID, setcurrentDbUserID] = useState([]);
  const history = useHistory();

  // POBIERANIE KLIENTA ODPOWIADAJĄCEGO USEROWI Z FIREBASA
  async function getCurrentDbUser() {
    await fetch(`${path}/get-current-db-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: currentUser.email,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then(function (data) {
        setcurrentDbUser(data);
        setcurrentDbUserID(data[0].klient_ID);
      });
  }

  useEffect(() => {
    getCurrentDbUser();
  }, []);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          {" "}
          <img className="Logo" src="logo.png" />{" "}
        </Link>
        <div className="navTxt">
          {!currentUser && (
            <Link to="Zaloguj" id="LogNav">
              Zaloguj się
            </Link>
          )}
          {currentUser && (
            <button variant="link" className="LogOutNav" onClick={handleLogout}>
              Wyloguj się
            </button>
          )}

          <Link to={"/panel-klienta/" + currentDbUserID} id="">
            Panel Klienta
          </Link>

          {currentUser && (
            <Link to="Admin" id="AdminNav">
              Panel Administratora
            </Link>
          )}
          {!currentUser && (
            <Link to="/admin-login" id="AdminNav">
              Panel Administratora
            </Link>
          )}
        </div>
      </div>
      {currentUser && <strong>Zalogowano jako: {currentUser.email}</strong>}
    </div>
  );
}

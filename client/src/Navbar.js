import React, { useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Navbar() {
    
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    
    return ( 
        <div>
          
          <div className="navbar">
            <Link to="/"> <img className="Logo" src="logo.png" /> </Link> 
            {!currentUser && <Link to="Zaloguj" id='LogNav'>Zaloguj się</Link>}
            {currentUser && 
            <button variant="link" className="LogOutNav" onClick={handleLogout}>
                Wyloguj
            </button>}
            </div>
            {currentUser && <strong>Email: {currentUser.email}</strong>}
        </div>
     );
}
 

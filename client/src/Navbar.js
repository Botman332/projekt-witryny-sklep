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
        <div className="navbar">
            {/* wyświetlić nazwe uzytkownika tylko jesli istnieje */}
            {currentUser && <strong>Email: {currentUser.email}</strong>} 
            <Link to="/">Strona główna</Link>
            <Link to="Zaloguj">Zaloguj się</Link>
            <Link to="/update-profile" >
                Update Profile
            </Link>
            <button variant="link" onClick={handleLogout}>
                Log Out
            </button>
        </div>
     );
}
 

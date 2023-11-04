import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const AdminNavbar = () => {
    return ( 
        <div className="AdminNavbar">
            <Link to="/produkty">Zarządzaj produktami</Link>
            <Link to="/klienci">Zarządzaj klientami</Link>
            <Link to="/zamowienia">Zarządzaj zamówieniami</Link>
            <Link to="/platnosci">Zarządzaj płatnościami</Link>
        </div>
     );
}
 
export default AdminNavbar;
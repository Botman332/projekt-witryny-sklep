import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"

const Admin = () => {
    return (
        <div className="admin">

        <AdminNavbar/>
        
        </div> 
        
     );
}
 
export default Admin;
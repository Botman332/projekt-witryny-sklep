import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

let isAdmin = false

const AdminLogin = () => {

    const path = process.env.REACT_APP_PATH
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const { currentUser, logout } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
      async function handleLogout() {
        await logout()  
    }
      handleLogout();
  }, [])


    async function handleSubmit(e) {
        e.preventDefault()

        try {
          setError("")
          setLoading(true)
          await fetch(`${path}/admin-login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value})
          }).then((response) =>{
            return response.json();
        }).then(function (data) {
            if(data == "admin"){
                isAdmin = true
            }else if (data == "user"){
                isAdmin = false
            }
        })
          if (isAdmin == true){
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/Admin")
          }else{
            setError("Użytkownik nie jest administratorem")
          }
          
        } catch (e) {
          setError("Niepoprawny email lub hasło")
        }
    
        setLoading(false)
      }

    return ( 
    <div className="adminLogin">
         <form className="loginForm" onSubmit={handleSubmit}>
            <h2>Zaloguj się</h2>
                <label>Email:</label>
                <input type="email" ref={emailRef} required />

                <label>Hasło:</label>
                <input type="password" ref={passwordRef} required />

                <button id="LogBut">Zaloguj się</button>
            </form>

            {error && <p className="Error">{error}</p>}            
            <div className="">
                <Link to="/reset-password" className="LogComm" id="ForgotPassword">Zapomniałeś hasła?</Link>
            </div>
            <div className="LogComm">
              Nie masz jeszcze konta? <Link to="/zarejestruj" id="RejLink">Zarejestruj się</Link>
            </div>
    </div> 
    );
}

export default AdminLogin;
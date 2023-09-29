import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

const Zaloguj = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
    
        try {
          setError("")
          setLoading(true)
          await login(emailRef.current.value, passwordRef.current.value)
          history.push("/")
        } catch {
          setError("Niepoprawny email lub hasło")
        }
    
        setLoading(false)
      }
    

    return ( 
        <div className="zaloguj">   
              
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" ref={emailRef} required />

                <label>Hasło:</label>
                <input type="password" ref={passwordRef} required />

                <button>Zaloguj się</button>
            </form>

            {error && <p className="Error">{error}</p>}            

            <div className="">
                <Link to="/reset-password">Zapomniałeś hasła?</Link>
            </div>
            <div className="">
              NIe masz jeszcze konta? <Link to="/zarejestruj">Zarejestruj się</Link>
            </div>

        </div>
     );
}
 
export default Zaloguj;
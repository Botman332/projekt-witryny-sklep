import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext.js'
import { Link, useHistory } from "react-router-dom"

export default function Rejestracja() {
    
  const path = process.env.REACT_APP_PATH
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
      
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Hasła się nie zgadzają")
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(passwordRef.current.value)){
          return setError("Hasło nie spełnia wymogów bezpieczeństwa\n(Min 8 znaków, jedna wielka litera, jedna cyfra, jeden znak specjalny)")
        }

        
        
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          await fetch(`${path}/register-user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email: emailRef.current.value, password: passwordRef.current.value})
          })
          history.push("/")
        } catch (e) {
          switch (e.code){
            case "auth/invalid-email":
              setError("Nieprawidłowy email")
              break;
            case "auth/email-already-exists":
              setError("Istnieje już konto o podanym adresie email")
              break;
            default:
              setError("Błąd tworzenia konta");
          }       
        }
            setLoading(false)
      }

    return (
        <>
        <div className='rejestracja'>
        <form className="signForm" onSubmit={handleSubmit}>
        <h2>Rejestracja</h2>
            <div id="email">
                <label>Email:</label>
                <br></br>
                <input type="email" ref={emailRef} required />
            </div>
            <div id="password">
                <label>Hasło:</label>
                <br></br>
                <input type="password" ref={passwordRef} required />
            </div>
            <div id="password confirm">
                <label>Potwierdź hasło:</label>
                <br></br>
                <input type="password" ref={passwordConfirmRef} required />
            </div>
            <button className='Sbmt' disabled={loading} type='submit'>Zarejestruj się</button>
        </form>

        {error && <p className="Error">{error}</p>}    

        <br/>
        <br/>
        <div className="signComm">
            Masz już konto? <Link to="/zaloguj" id="LogLink">Zaloguj się</Link>
        </div>
        </div>
    </>
    )
}

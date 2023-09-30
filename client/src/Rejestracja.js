import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext.js'
import { Link, useHistory } from "react-router-dom"

export default function Rejestracja() {
    
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
          return setError("Passwords do not match")
        }
    
        try {
          setError("")
          setLoading(true)
          await signup(emailRef.current.value, passwordRef.current.value)
          history.push("/")
        } catch {
          setError("Failed to create an account")
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
                <label>Hasło::</label>
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
        <div className="signComm">
            Masz już konto? <Link to="/zaloguj" id="LogLink">Zaloguj się</Link>
        </div>
        </div>
    </>
    )
}
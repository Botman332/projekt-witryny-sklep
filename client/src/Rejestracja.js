import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
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
        <h2>Rejestracja</h2>
        <form className="signForm" onSubmit={handleSubmit}>
            <div id="email">
                <label>Email:</label>
                <input type="email" ref={emailRef} required />
            </div>
            <div id="password">
                <label>Hasło::</label>
                <input type="password" ref={passwordRef} required />
            </div>
            <div id="password confirm">
                <label>Potwierdź hasło:</label>
                <input type="password" ref={passwordConfirmRef} required />
            </div>
            <button className='Sbmt' disabled={loading} type='submit'>Zarejestruj się</button>


        </form>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/zaloguj">Log In</Link>
        </div>
        </div>
    </>
    )
}
import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ResetPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
          <h2>Odzyskaj hasło</h2>
          {error && {error}}
          {message && {message}}
          <form onSubmit={handleSubmit}>
            
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            
            <button disabled={loading} type="submit">
              Zresetuj hasło
            </button>
          </form>
          <div>
            <Link to="/zaloguj">Zaloguj się</Link>
          </div>
      <div>
        Nie masz konta? <Link to="/zarejestruj">Zarejstruj się!</Link>
      </div>
    </>
  )
}
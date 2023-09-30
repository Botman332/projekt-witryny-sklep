import React, { useRef, useState } from "react"
import { useAuth } from "./contexts/AuthContext.js"
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
    <div className="ResetP">
          {error && {error}}
          {message && {message}}
          <form onSubmit={handleSubmit} className="ResForm">
          <h2>Odzyskaj hasło</h2>
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            
            <button disabled={loading} type="submit" id="ResBut">
              Wyślij
            </button>
          </form>
      </div>
    </>
  )
}
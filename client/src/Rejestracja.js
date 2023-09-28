import React, { useRef } from 'react'
import { useAuth } from './contexts/AuthContext'

export default function Rejestracja() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {signup} = useAuth()

    function handleSubmit(e) {
        e.preventDefault()

        signup(emailRef.current.value, passwordRef.current.value)
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
            <button className='Sbmt' type='submit'>Zarejestruj się</button>


        </form>
        <div className='d1'>
            Masz już konto? Zaloguj się


        </div>
        </div>
    </>
    )
}
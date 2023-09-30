import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Zaloguj from './Zaloguj';
import { AuthProvider } from "./contexts/AuthContext";
import Rejestracja from './Rejestracja';
import ResetPassword from './ResetPassword';
import Footer from './Footer';
;


function App() {

  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/api").then(
  //     response => response.json()
  //   ).then(
  //     data => {
  //       setBackendData(data)
  //     }
  //   )
  // }, [])

  return (
    <Router>
      <div className='App'>
        {/* {(typeof backendData.users === 'undefined') ? (
      <p>Loading...</p>
    ): (
      backendData.users.map((user, i) => (
      <p key={i}>{user}</p>
      ))
    )} */}
    </div>
    <AuthProvider>
      <Navbar/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/zaloguj">
            <Zaloguj/>
          </Route>
          <Route path="/zarejestruj">
            <Rejestracja/>
          </Route>
          <Route path="/reset-password">
            <ResetPassword/>
          </Route>
        </Switch>
        <Footer/>
      </AuthProvider>
    </Router>
    
  )
}

export default App
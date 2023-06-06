
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthenticationContext'

export default function LoginComponent() {
  const [username, setUsername] = useState('UserEmail')

  const [password, setPassword] = useState('')

  const [showErrorMessage, setShowErrorMessage] = useState(false)

  const navigate = useNavigate()
  const authContext = useAuth()

  function handleUsernameChange(event) {
      setUsername(event.target.value)
  }

  function handlePasswordChange(event) {
      setPassword(event.target.value)
  }

  async function handleSubmit() {
      if(await authContext.login(username, password)){
          navigate(`/notes`)
      } else {
          setShowErrorMessage(true)
      }
  }
  return (
    <main className='login'>
      <h1>Time to Login!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed. 
                                                            Please check your credentials.</div>}
            <div className="LoginForm">
                <div>
                    <label>User Name:</label>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>login</button>
                </div>
            </div>
    </main>
  )
}

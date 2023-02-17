import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import login from '../assets/login.png'

const Login = () => {

  const { state, dispatch } = useContext(UserContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()

    const res = await fetch('/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email, password
      })
    })

    const data = await res.json()
    if (res.status === 400 || !data) {
      window.alert("Failed to Login")
      console.log("Failed to Login")
    }
    else {
      dispatch({ type: "ACTIVE", payload: true })
      window.alert("User Login Succesfully")
      console.log("User Login Succesfully")
      navigate('/')
    }
  }

  return (
    <div className='login-form'>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <form method='POST'>
              <h2>Log In</h2>
              <input type='text' id='email' className='field' name='email' value={email} onChange={(e) => {
                setEmail(e.target.value)
              }} placeholder='Email Address' required autoFocus="off" autoComplete='off'></input>

              <input type='password' id='password' className='field' name='password' value={password} onChange={(e) => {
                setPassword(e.target.value)
              }} placeholder='Password' required autoFocus="off" autoComplete='off'></input>

              <input type="submit" className="button" name="login" onClick={loginUser} id="login" value="LogIn"></input>
            </form>
            <p className="account">Don't have an account? <Link to='/registration'>Register</Link></p>
          </div>
          <div className="form-img">
            <img src={login} alt='vector'></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
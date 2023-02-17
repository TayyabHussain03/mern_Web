import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from '../assets/reg.png'

const Registration = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: ""
  })

  const storeUser = (event) => {
    setUser({
      ...user,
      //  jis event ko target krenge usi main hee uski value
      // store hogi aur woh aisey hogi
      [event.target.name]: event.target.value
    })
  }

  const storeData = async (e) => {
    e.preventDefault()

    const { name, email, phone, work, password, cpassword } = user

    const res = await fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, email, phone, work, password, cpassword
      })
    })

    const data = await res.json()
    if (data.status === 500 || !data) {
      window.alert("Failed to Register")
      console.log("Failed to Register")
    }
    else {
      window.alert("User Registered Succesfully")
      console.log("User Registered Succesfully")
      navigate('/login')
    }
  }

  return (
    <div className='login-form'>
      <div className='container'>
        <div className='main'>
          <div className='content'>
            <form method='POST'>
              <h2>Sign Up</h2>
              <input type='text' id='user-name' className='reg-field' name='name' placeholder='User Name' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.name}></input>
              <input type='text' id='email' className='reg-field' name='email' placeholder='Email Address' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.email}></input>
              <input type="text" id='phone' className='reg-field' name='phone' placeholder='Phone' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.phone}></input>
              <input type='text' id='work' className='reg-field' name='work' placeholder='Your Profession' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.work}></input>
              <input type='password' id='password' className='reg-field' name='password' placeholder='Password' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.password}></input>
              <input type='password' id='cpassword' className='reg-field' name='cpassword' placeholder='Confirm Password' required autoFocus="off" autoComplete='off' onChange={storeUser} value={user.cpassword}></input>
              <input type="submit" className="button" name="login" id="login" value="Sign Up" onClick={storeData}></input>
            </form>
            <p className="account">Already have an account? <Link to='/login'>SignIn</Link></p>
          </div>
          <div className="form-img">
            <img src={register} alt='vector'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
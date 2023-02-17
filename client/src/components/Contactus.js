import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import contact from '../assets/contactus.png'

const Contactus = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })
  const getContact = async () => {
    try {
      const res = await fetch('/getContact', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const resData = await res.json()
      setData({ ...data, name: resData.name, email: resData.email, phone: resData.phone })

      if (!res.status === 200) {
        throw new Error(res.error)
      }
    } catch (err) {
        navigate('/login')
    }
  }

  useEffect(() => {
    getContact()
  }, [])

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({ ...data, [name]: value })
  }
  const sendMessage = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = data;
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message
        })
      });
      if (res.status === 201) {
        console.log("message sent successfully");
        setData({ ...data, message: "" })
      }
      else {
        console.log("message not sent");
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className="cards">
        <div className='cards-row'>
          <div className='column'>
            <div className='icon'>
              <i className="zmdi zmdi-email"></i>
            </div>
            <p><span className='card-heading'>Email: </span>contact@tayyab.com</p>
          </div>
          <div className='column'>
            <div className='icon'>
              <i className="zmdi zmdi-phone-in-talk"></i>
            </div>
            <p><span className='card-heading'>Phone: </span>+92-3122345987</p>
          </div>
          <div className='column'>
            <div className='icon'>
              <i className="zmdi zmdi-map"></i>
            </div>
            <p><span className='card-heading'>Address: </span>Karachi, Pakistan</p>
          </div>
        </div>
      </div>
      <div className='contact-form'>
        <div className='contact-container'>
          <div className='contact-main'>
            <div className='contact-content'>
              <form method='POST'>
                <h2>Contact Us</h2>
                <input type='text' id='user-name' className='reg-field' name='name' value={data.name} onChange={handleInput} placeholder='Full Name' required autoFocus="off" autoComplete='off'></input>
                <input type='text' id='email' className='reg-field' name='email' value={data.email} onChange={handleInput} placeholder='Email Address' required autoFocus="off" autoComplete='off'></input>
                <input type="text" id='phone' className='reg-field' name='phone' value={`+92-${data.phone}`} onChange={handleInput} placeholder='Phone' required autoFocus="off" autoComplete='off'></input>
                <div className="form-outline">
                  <textarea name="message" className="form-control" id="textAreaExample1" value={data.message} rows={4} onChange={handleInput} placeholder="Message" />
                </div>
                <input type="submit" className="button" name="login" id="login" value="Send Message" onClick={sendMessage}></input>
              </form>
            </div>
            <div className="form-img">
              <img src={contact} alt='vector'></img>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Contactus
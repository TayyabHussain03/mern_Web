import React, { useState, useEffect } from 'react'
import image from '../assets/container.jpg'


const Home = () => {
  const [data, setData] = useState()
  const [show, setShow] = useState(false)
  const homePageData = async () => {
    try {
      const res = await fetch('/home', {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      })
      const userData = await res.json()
      setData(userData.name)
      setShow(true)

      if (!res.status === 200) {
        throw new Error(res.error)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    homePageData()
  }, [])
  return (
    <div className="home-container">
      <img src={image} alt="coding" style={{ width: '100%', maxHeight: '565px', objectFit: 'cover' }} />
      <div style={{ background: 'transparent' }} className="centered">
        <h6>WELCOME</h6>
        <h1 style={{ textTransform: 'capitalize' }}>{show ? data : 'I am MERN Stack Developer'}</h1>
        <h5 style={{background:'transparent',fontWeight:'bold'}}>Happy to see you!</h5>
      </div>
    </div>
  )
}

export default Home
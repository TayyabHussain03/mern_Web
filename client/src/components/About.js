import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.jpg'
import { useNavigate } from 'react-router-dom'


const About = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({})
  const callAboutPage = async () => {
    try {
      const res = await fetch('/about', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json()
      console.log(data)
      setData(data)

      if (!res.status === 200) {
        throw new Error(res.error)
      }
    } catch (err) {
      console.log(err)
      navigate('/login')
    }
  }

  useEffect(() => {
    callAboutPage()
  }, [])

  return (
    <div className='about-section'>
      <h2>About Me</h2>
      <form className='about-form' method='GET'>
        <div style={{ width: '80%' }}>
          <div className="row">
            <div className="col-md-4 profile-area">
              <img src={profile} alt="profile" style={{ borderRadius: "50%", border: "1px solid black", width: "130px", height: "130px", objectFit: "cover", }}></img>
              <h5 className="mt-3 mb-1 username">{!data ? "Tayyab Hussain" : data.name}</h5>
              <h6 className='profession'>{!data ? "MERN Stack Deceloper" : data.work}</h6>
            </div>
            <div className="col-md-6 mb-0">
              <div className='profile-desc'>
                <p className='description'>An experienced MERN Stack developer with Microsoft certification, skilled in React JS,
                  React Native, Firebase, MongoDB, Node JS, and API integration. Proficient in JavaScript,
                  HTML/CSS, Bootstrap, and Tailwind CSS. Offers professional front-end development services,
                  committed to delivering excellent results.</p>
                <p className='rating'>Ratings: <span className='ranking-main'> 4.5/5</span> <span className='ranking ml-5'>Ranking: </span><span className='ranking-main'> 1/10</span> </p>
              </div>
            </div>
            <div className="col-md-2">
              <input type="button" value="Edit Profile" className="editProf"></input>
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-md-4'>
              <div className='links'>
                <span style={{ textDecoration: 'underline' }}> Profile Links:</span>
                <div className='link1 mt-3'>
                  <i className="zmdi zmdi-facebook-box"></i>
                  <a href="https://www.facebook.com/profile.php?id=100041711958208" target="_blank"> Facebook</a>
                </div>
                <div className="link2 mt-3">
                  <i className="zmdi zmdi-linkedin-box"></i>
                  <a href="https://www.linkedin.com/in/tayyabhussain2910/" target="_blank"> Linked In</a>
                </div>
                <div className='link3 mt-3'>
                  <i className="zmdi zmdi-github-box"></i>
                  <a href="https://www.github.com/tayyabhussain03/" target="_blank"> GitHub</a>
                </div>
              </div>
            </div>
            <div className='col-md-8 tab-area'>
              <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                  <a className="nav-link active" id="home-tab" data-toggle="tab" role="tab" href="#home">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" id="profile-tab" data-toggle="tab" role="tab" href="#profile">Timeline</a>
                </li>
              </ul>
              <div className='tab-content profile-tab' id='myTabContent'>
                <div className='tab-pane fade show active' id='home' role='tab-panel' aria-labelledby='home-tab'>
                  <div className='row mt-4 details'>
                    <div className='col-md-6'>
                      <label>User ID</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{!data ? "78965455678123" : data._id}</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Name</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{!data ? "Tayyab Hussain" : data.name}</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Email</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{!data ? "contact@tayyab.com" : data.email}</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Phone</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{!data ? "+92-312246589" : `+92-${data.phone}`}</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Profession</label>
                    </div>
                    <div className='col-md-6'>
                      <p>{!data ? "Web & Mobile App Developer" : data.work}</p>
                    </div>
                  </div>
                </div>
                <div className='tab-pane fade' id='profile' role='tab-panel' aria-labelledby='profile-tab'>
                  <div className="row mt-4 details">
                    <div className='col-md-6'>
                      <label>Level</label>
                    </div>
                    <div className='col-md-6'>
                      <p>Expert</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Experience</label>
                    </div>
                    <div className='col-md-6'>
                      <p>2+ yrs</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Hourly Rate</label>
                    </div>
                    <div className='col-md-6'>
                      <p>$10/hr</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Total Projects</label>
                    </div>
                    <div className='col-md-6'>
                      <p>70+</p>
                    </div>
                    <div className='col-md-6'>
                      <label>Portfolio</label>
                    </div>
                    <div className='col-md-6'>
                      <a href="https://www.github.com/tayyabhussain03/" target="_blank">Click Here</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default About
import React, { useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App';
import logo from '../assets/logo (1).png'

const Navbar = () => {

    const [activeLink, setActiveLink] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navbarCollapseRef = useRef(null);
    const { state, dispatch } = useContext(UserContext)

    const handleClick = (link) => {
        setActiveLink(link);
    }

    const handleToggleButtonClick = () => {
        setIsCollapsed(!isCollapsed);
        navbarCollapseRef.current.style.display = isCollapsed ? 'block' : 'none';
        navbarCollapseRef.current.style.marginTop = isCollapsed ? '1rem' : '0';
    };

    const RenderNavbar = () => {
        if (state) {
            return <>
                <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`}
                    onClick={() => handleClick('home')}>
                    <Link className="nav-link" to="/" relative='path'>Home</Link>
                </li>
                <li className={`nav-item ${activeLink === 'about' ? 'active' : ''}`}
                    onClick={() => handleClick('about')}>
                    <Link className="nav-link" to="/about" relative='path'>About</Link>
                </li>
                <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`}
                    onClick={() => handleClick('contact')}>
                    <Link className="nav-link" to="/contact" relative='path'>Contact</Link>
                </li>
                <li className={`nav-item ${activeLink === 'logout' ? 'active' : ''}`}
                    onClick={() => handleClick('logout')}>
                    <Link className="nav-link" to="/logout" relative='path'>Logout</Link>
                </li>
            </>
        }
        else {
            return <>
                <li className={`nav-item ${activeLink === 'home' ? 'active' : ''}`}
                    onClick={() => handleClick('home')}>
                    <Link className="nav-link" to="/" relative='path'>Home</Link>
                </li>
                <li className={`nav-item ${activeLink === 'about' ? 'active' : ''}`}
                    onClick={() => handleClick('about')}>
                    <Link className="nav-link" to="/about" relative='path'>About</Link>
                </li>
                <li className={`nav-item ${activeLink === 'contact' ? 'active' : ''}`}
                    onClick={() => handleClick('contact')}>
                    <Link className="nav-link" to="/contact" relative='path'>Contact</Link>
                </li>
                <li className={`nav-item ${activeLink === 'login' ? 'active' : ''}`}
                    onClick={() => handleClick('login')}>
                    <Link className="nav-link" to='/login' relative='path'>Login</Link>
                </li>

                <li className={`nav-item ${activeLink === 'registration' ? 'active' : ''}`}
                    onClick={() => handleClick('registration')}>
                    <Link className="nav-link" to="/registration" relative='path'>Registration</Link>
                </li>
            </>
        }
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
                <img width="120" src={logo} alt="logo"></img>
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                onClick={handleToggleButtonClick}
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div
                className={`navbar-collapse ${isCollapsed ? 'show' : ''}`}
                ref={navbarCollapseRef}
            >
                <ul className="navbar-nav ml-auto">
                    <RenderNavbar />
                </ul>
            </div>
        </nav>
    )
}

export default Navbar

import React, {useContext} from 'react'

import './Footer.css'

import { Link } from 'react-router-dom';

const Footer = (props) => {

  const loggedIn = (
    <ul>
      <div className="general-links">

          <Link to='/people'><span> People</span></Link>

          <Link to='/projects'><span> Projects</span></Link>

          <Link to='/about'><span> About</span></Link>

        </div>

        <div className="auth-links">

          <Link to='/dashboard'><span > You</span></Link>

          <Link
            to='/' className="sign" >
          <span >
          Sign Out</span></Link>

        </div>
      </ul>
  )

  const loggedOut = (
    <ul>
      <div className="auth-links">
        <Link to='/login'  className="login"><span> Login</span></Link>

        <Link to='/register' className="sign"><span> Sign Up</span></Link>
      </div>

      <div className="general-links">
        <Link to='/people'><span> People</span></Link>

        <Link to='/projects'>
        <span> Projects</span></Link>

        <Link to='/about'><span> About</span></Link>
      </div>
    </ul>
  )

  return (
    <footer className="footer">
            <Link to="/" ><span className="icon-sm">Coopefy</span></Link>
        {context.isLoggedIn ? loggedIn : loggedOut}
    </footer>
  )
}

export default Footer;

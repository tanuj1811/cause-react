import React, { useContext, useState, useEffect } from 'react'

import './header.scss'

import { Link, NavLink } from 'react-router-dom'

import { BiMenuAltRight } from 'react-icons/bi'
import { AiOutlineClose } from 'react-icons/ai'
import { useAuth } from '../../context/authContext'

const Header = () => {
  const auth = { isLoggedIn: false }
  const { currentUser, logout } = useAuth()

  const [menuBtn, setMenuBtn] = useState(false)
  const [screenSize, setScreenSize] = useState({
    width: undefined,
    height: undefined,
  })

  const toggleMenuBtn = () => {
    setMenuBtn((p) => !p)
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      window.addEventListener('resize', handleResize)
    }
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (screenSize.width > 768 && menuBtn) {
      setMenuBtn(false)
    }
  }, [screenSize.width, menuBtn])

  return (
    <header className="header">
      <div className="content">
        <div>
          <h2 className="logo">Query Point</h2>
        </div>
        <div>
          {!currentUser && (
            <nav className={`feature ${menuBtn ? 'menu' : ''}`}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/">About</NavLink>
              <NavLink to="/auth">Login/SignUp</NavLink>
            </nav>
          )}
          {currentUser && (
            <nav className={`feature ${menuBtn ? 'menu' : ''}`}>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/">Groups</NavLink>
              <div className="dropdown">
                <button className="dropbtn">
                  Queries
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to="/query">Ask Query</Link>
                  <Link to="/queries#yourqueries">Your Queries</Link>
                  <Link to="/queries">All Queries</Link>
                  <Link to="/queries#unsolvedqueries">Unsolved Queries</Link>
                  <Link to="/queries#mostcommonquery">Most Common Queries</Link>
                </div>
              </div>
              <div className="dropdown">
                <button className="dropbtn">
                  Join Community
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <a href="https://github.com/tanujdadheech">Github</a>
                  <a href="https://discord.gg/V9MREGkQTV">Discord</a>
                  <a href="https://linkedIn.com/tanujsharma01">LinkedIn</a>
                  <a href="https://youtube.com">Youtube</a>
                  <NavLink to="/">Feedback Form</NavLink>
                </div>
              </div>

              <div className="dropdown">
                <button className="dropbtn">
                  Profile
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-content">
                  <Link to={`/users/${currentUser._id}`}>{`{tanuj}`}</Link>
                  <Link to="#">Edit Profile</Link>
                  <Link to="#">Password Setting</Link>
                  <Link to="/" onClick={() => logout()}>
                    Logout
                  </Link>
                </div>
              </div>
            </nav>
          )}
        </div>
        <div className="toggle">
          {!menuBtn ? (
            <BiMenuAltRight onClick={toggleMenuBtn} />
          ) : (
            <AiOutlineClose onClick={toggleMenuBtn} />
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

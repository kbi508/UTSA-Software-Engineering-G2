import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import styles from './navbar.module.css'
import logo from '../assets/onePopStopShop_logo_wide.png'
import logoSmall from '../assets/onePopStopShop_logo_small.svg'
import { ShopContext } from '../context/shop-context'
import { Login } from './login'

export const Navbar = () => {
  const {authUser, userLogOut, toggleOpen} = useContext(ShopContext)
  const [showLogin, setShowLogin] = useState(false)
  const loginRef = useRef(null)
  const location = useLocation()
  
  useEffect(() => {
    const handleClickOutside = (e) =>
    {
      if (loginRef.current && !loginRef.current.contains(e.target))
        setShowLogin(false)
    }
    
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLogin])

  // Hide login splash if logged in.
  useEffect(() => {
    if (authUser) setShowLogin(false)
  }, [authUser])

  return (
    <>
    {location.pathname !== '/checkout' ?
      (
        <header className={styles.navbar} id='navbar'>
          <Link to="/">
            <img className={styles.logo} src={logo} alt='Logo' />
          </Link>
          {location.pathname === '/' &&
          (
          <div className={styles.rightWrapperNav}>
            {authUser && (<Link className={styles.pageLink} to="/account"> {authUser.email} </Link>)}
            <button className={`${styles.loginButton} ${styles.navBttn}`} onClick={authUser ? userLogOut : () => setShowLogin(!showLogin)}>{authUser ? 'Logout' : 'Login'}</button>
            <button className={`${styles.cartButton} ${styles.navBttn}`} onClick={toggleOpen}>
                <ShoppingCart className={styles.cartComp} size='32' />
            </button>
          </div>)}
          <div ref={loginRef} className='loginWrapper'>
            {showLogin && <Login />}
          </div>
        </header>
      )
      :
      (
        <header className={styles.navbar} id='navbar'>
          <img className={styles.logoCheckout} src={logoSmall} alt='Logo' style={{height: 70 + '%'}}/>
        </header>
      )
    }
    </>
  )
}
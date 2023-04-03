import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import styles from './navbar.module.css'
import logo from '../assets/onePopStopShop_logo_wide.svg'
import { ShopContext } from '../context/shop-context'
import { Login } from './login'

export const Navbar = () => {
  const {toggleOpen} = useContext(ShopContext)
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

  return (
    <>
    {location.pathname != '/checkout' ?
      (
        <header className={styles.navbar} id='navbar'>
          <Link to="/">
            <img className={styles.logo} src={logo} alt='Logo' />
          </Link>
          <nav className={styles.nav}>
            <ul className={styles.nav_links}>
              <li><Link className={styles.pageLink} to="/account"> Account </Link></li>
            </ul>
          </nav>
          {location.pathname === '/' &&
          (<div className={styles.rightWrapperNav}>
            <button className={`${styles.loginButton} ${styles.navBttn}`} onClick={() => setShowLogin(!showLogin)}>Login</button>
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
          <img className={styles.logo} src={logo} alt='Logo' style={{height: 70 + '%'}}/>
        </header>
      )
    }
    </>
  )
}
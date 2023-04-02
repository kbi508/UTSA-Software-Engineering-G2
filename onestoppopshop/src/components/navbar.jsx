import React, { useContext, useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import styles from './navbar.module.css'
import logo from '../assets/onePopStopShop_logo_v2.svg'
import { ShopContext } from '../context/shop-context'
import { Login } from './login'

export const Navbar = () => {
  const {toggleOpen} = useContext(ShopContext)
  const [showLogin, setShowLogin] = useState(false)
  const loginRef = useRef(null)

  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  const handleClickOutside = (e) =>
  {
    if (!loginRef.current.contains(e.target))
      toggleLogin()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)

    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  return (
  <header className={styles.navbar} id='navbar'>
    <Link className={styles.pageLink} to="/">
      <img className={styles.logo} src={logo} alt='Logo' />
    </Link>
    <nav className={styles.nav}>
      <ul className={styles.nav_links}>
        {/* <li><Link className={styles.pageLink} to="/"> Shop </Link></li> */}
        <li><Link className={styles.pageLink} to="/account"> Account </Link></li>
      </ul>
    </nav>
    <div className={styles.rightWrapperNav}>
      <button className={`${styles.loginButton} ${styles.navBttn}`} onClick={toggleLogin}>Login</button>
      <button className={`${styles.cartButton} ${styles.navBttn}`} onClick={toggleOpen}>
          <ShoppingCart className={styles.cartComp} size='32' />
      </button>
    </div>
    <div ref={loginRef} className='loginWrapper'>
     {showLogin && <Login />}
    </div>
  </header>
  )
}
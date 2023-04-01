import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import styles from './navbar.module.css'
import logo from '../assets/onePopStopShop_logo_v2.svg'
import { ShopContext } from '../context/shop-context'

export const Navbar = () => {
  const {toggleOpen} = useContext(ShopContext)

  return (
  <header className={styles.navbar} id='navbar'>
    <img className={styles.logo} src={logo} alt='Logo' />
    <nav className={styles.nav}>
      <ul className={styles.nav_links}>
        <li><Link className={styles.pageLink} to="/"> Shop </Link></li>
        <li><Link className={styles.pageLink} to="/account"> Account </Link></li>
      </ul>
    </nav>
    <div className={styles.rightWrapperNav}>
      <button className={`${styles.loginButton} ${styles.navBttn}`}>Login</button>
      <button className={`${styles.cartButton} ${styles.navBttn}`}onClick={toggleOpen}>
          <ShoppingCart className={styles.cartComp} size='32' />
      </button>
    </div>
  </header>
  )
}
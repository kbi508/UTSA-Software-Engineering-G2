import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import './navbar.css'
import logo from '../assets/onePopStopShop_logo_v2.svg'
import { ShopContext } from '../context/shop-context'

export const Navbar = () => {
  const {isOpen, toggleOpen} = useContext(ShopContext)

  return (
  <header>
    <img className='logo' src={logo} alt='Logo' />
    <nav>
      <ul className='nav_links'>
        <li><Link className='page-link' to="/"> Shop </Link></li>
        <li><Link className='page-link' to="/bargins"> Today's Bargins </Link></li>
      </ul>
    </nav>
    <div className='right-wrapper-nav'>
      <button className='login-button nav-bttn'>Login</button>
      <button className='cart-button nav-bttn'>
        <button onClick={toggleOpen}>
          <ShoppingCart className='cart-comp' size='32' />
        </button>
      </button>
    </div>
  </header>
  )
}
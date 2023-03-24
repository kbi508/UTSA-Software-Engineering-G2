 import React from 'react'
 import { Link } from 'react-router-dom'
 import { ShoppingCart } from 'phosphor-react'
 import './navbar.css'
 import logo from '../assets/logo.svg'

 export const Navbar = () => {
   return (
    <header>
      <img className='logo' src={logo} alt='Logo'/>
      <nav>
        <ul className='nav_links'>
          <li><Link className='page-link' to="/"> Shop </Link></li>
          <li><Link className='page-link' to="/bargins"> Today's Bargins </Link></li>
        </ul>
      </nav>
      <div className='right-wrapper-nav'>
        <button className='login-button'>Login</button>
        <button className='cart-button'>
          <Link to='/cart'>
            <ShoppingCart className='cart-comp' size='32' />
          </Link>
        </button>
      </div>
    </header>
   )
 }
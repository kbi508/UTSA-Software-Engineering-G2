 import React from 'react'
 import { Link } from 'react-router-dom'
 import { ShoppingCart } from 'phosphor-react'

 export const Navbar = () => {
   return (
     <div className='navbar'>
      <div className='links'>
        <Link to="/"> Shop </Link>
        <Link to="/bargins"> Today's Bargins </Link>
        <button className='cart-button'>
          <ShoppingCart size='32' />
        </button>
      </div>
     </div>
   )
 }
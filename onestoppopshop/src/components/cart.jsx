import React, { useContext, useEffect } from 'react'
import { PRODUCTS } from '../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../context/shop-context'
import './cart.css'

export const Cart = (props) => {
  const { cartItems, getTotalCartAmount, toggleOpen, isOpen } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)


  return (
    <div className='cart'>
        <div className='x-bttn' onClick={toggleOpen}>X</div>
        <div className='cart-items'>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                    <CartItem data={product}/>
            })}
        </div>

        <div className='checkout'>
            <p>Subtotal: ${totalAmount}</p>
            <button className='checkout-bttn'> Checkout </button>
        </div>
    </div>
  )
}

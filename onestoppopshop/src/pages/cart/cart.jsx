import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../../context/shop-context'
import './cart.css'

import { useNavigate } from 'react-router-dom'

export const Cart = () => {
  const { cartItems, getTotalCartAmount } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const navigate = useNavigate()

  return (
    <div className='cart'>
      <div><h1>Your Cart</h1></div>
      <div className='cart-items'>
        {PRODUCTS.map((product) => {
          if (cartItems[product.id] !== 0) 
          {
            return <CartItem data={product} />
          }
        })}
      </div>

    {totalAmount > 0 ?
      (<div className='checkout'>
        <p>Subtotal: ${totalAmount}</p>
        <button onClick={() => navigate('/')}> Continue Shopping</button>
        <button> Checkout</button>
      </div>)
    : (<h1>is Empty</h1>)}
    </div>
  )
}

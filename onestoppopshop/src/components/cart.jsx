import React, { useContext } from 'react'
import { PRODUCTS } from '../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../context/shop-context'
import './cart.css'

export const Cart = (props) => {
  const { cartItems, getTotalCartAmount, toggleOpen } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)


  return (
    <div className='cart'>
        <div className='x-bttn' onClick={toggleOpen}>X</div>

        <div className='cart-items'>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                  return <CartItem data={product}/>
            })}
        </div>

        <div className='checkout'>
            <p>Subtotal: ${totalAmount}</p>
            <button className='checkout-bttn cart-bttn'> Checkout </button>
            <button className='clear-bttn cart-bttn'> Clear Cart </button>
        </div>
    </div>
  )
}

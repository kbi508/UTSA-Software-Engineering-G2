import React, { useContext } from 'react'
import { PRODUCTS } from '../../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../../context/shop-context'

export const Cart = () => {
  const { cartItems } = useContext(ShopContext)
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
    </div>
  )
}

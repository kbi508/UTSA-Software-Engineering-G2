import React, { useContext, useState } from 'react'
import { PRODUCTS } from '../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../context/shop-context'
import { useNavigate } from 'react-router-dom'
import './cart.css'

export const Cart = (props) => {
  const [isOpen, setIsOpen] = useState(false)
  const { cartItems, getTotalCartAmount } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const navigate = useNavigate()

  return (
    <div className='cart'>
        <div className='x-bttn'>X</div>
        <div className='cart-items'>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                    <CartItem data={product}/>
            })}
        </div>

        {totalAmount > 0 ?
            (<div className='checkout'>
                <p>Subtotal: ${totalAmount}</p>
                <button className='checkout-bttn'> Checkout </button>
            </div>)
        : (<h1 className='empty'>Empty</h1>)}
    </div>
  )
}

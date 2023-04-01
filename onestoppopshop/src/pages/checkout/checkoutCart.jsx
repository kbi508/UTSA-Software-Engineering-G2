import React, { useContext, useState } from 'react'
import { PRODUCTS } from '../../products'
import { CheckoutCartItem } from './checkoutCartItem'
import {ShopContext} from '../../context/shop-context'
import './checkoutCart.css'

export const CheckoutCart = (props) => {
  const { cartItems, getTotalCartAmount, toggleOpen } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)

  const [tempCred, setTempCred] = useState(100)

  const chargeCredit = (amount) => {

  }


  return (
    <div className='checkout-cart'>
        <div className='cart-items'>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                  return <CheckoutCartItem data={product} />
                return <></>
            })}
        </div>

        <div className='checkout'>
            <p>Subtotal: ${totalAmount}</p>
            <p>Credit: {tempCred} - ${totalAmount} = {tempCred-totalAmount}</p>
            <button className='order-bttn cart-bttn' > Place Order </button>
            {/* <button className='cancel-bttn cart-bttn'> Cancel </button> */}
        </div>
    </div>
  )
}

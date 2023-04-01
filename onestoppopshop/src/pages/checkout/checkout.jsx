import React from 'react'
import { CheckoutCart } from './checkoutCart'
import './checkout.css'

export const Checkout = () => {
  return (
  <div className='checkout-page'>
    <div className='order-options'>
      <div className='separator'></div>
    </div>
    <CheckoutCart />
  </div>
  )
}

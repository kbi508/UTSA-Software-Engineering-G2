import React, { useState } from 'react'
import { CheckoutCart } from './checkoutCart'
import logo from '../../assets/onePopStopShop_logo_small.svg'
import './checkout.css'

export const Checkout = () => {
  const [isLogged, setIsLogged] = useState(true) /*This is a temp value for testing. Needs to be dependant on DB and authentication*/
  const [usingAcc, setUsingAcc] = useState(false)

  return (
  <div className='checkout-page'>
    <div className='order-panel'>
      <div className='separator'></div>
      <p>Order Info</p>
      <div className='account'>
        <div className='login-prompt'>
          {isLogged ? (<><p>{!usingAcc ? 'Use Account Info?' : 'Using Account'}</p><input type={'checkbox'} onChange={(e) => {setUsingAcc(e.target.checked)}} /></>) : (<p>Login to use Account info</p>)}
        </div>
        {!usingAcc && <input className='email' type={'email'}></input>}
      </div>
      <div className='separator'></div>
      <div className='shipping-inputs'>
      {!usingAcc ? 
          (<><p>Shipping Address</p>
          <input className='country'></input>
          <input className='street-add'></input>
          <input className='city'></input>
          <input className='state'></input>
          <input className='zip' type={'number'}></input></>)
        :
        (<img src={logo}/>)
      }
      </div>
      <div className='separator'></div>
    </div>
    <CheckoutCart />
  </div>
  )
}

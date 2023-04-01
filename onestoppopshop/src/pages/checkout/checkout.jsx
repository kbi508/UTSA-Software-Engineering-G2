import React, { useState } from 'react'
import { CheckoutCart } from './checkoutCart'
import logo from '../../assets/onePopStopShop_logo_small.svg'
import './checkout.css'

export const Checkout = () => {
  const [isLogged, setIsLogged] = useState(false) /*This is a temp value for testing. Needs to be dependant on DB and authentication*/
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
        {!usingAcc && <input className='email' type={'email'} placeholder='Email'></input>}
      </div>
      <div className='separator'></div>
      <div className='shipping-inputs'>
      {!usingAcc &&
          (<><p>Shipping Address</p>
          <input className='country' placeholder='Country'></input>
          <input className='street-add' placeholder='Address'></input>
          <input className='city' placeholder='City'></input>
          <input className='state' placeholder='State'></input>
          <input className='zip' type={'number'} placeholder='Zip'></input></>)
      }
      </div>
      {usingAcc && (<img src={logo}/>)}
      <div className='separator'></div>
    </div>
    <CheckoutCart />
  </div>
  )
}

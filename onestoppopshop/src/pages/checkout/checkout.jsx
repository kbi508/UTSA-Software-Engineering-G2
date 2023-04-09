import React, { useState } from 'react'
import { CheckoutCart } from './checkoutCart'
import logo from '../../assets/onePopStopShop_logo_small.svg'
import styles from './checkout.module.css'

export const Checkout = () => {
  const [isLogged, setIsLogged] = useState(true) /*This is a temp value for testing. Needs to be dependant on DB and authentication*/
  const [usingAcc, setUsingAcc] = useState(false)

  return (
  <div className={styles.checkoutPage}>
    <div className={styles.orderPanel}>
      <div className={styles.separator}></div>
      <div className={styles.orderPanelHeader}>
        <h1>Order Info</h1>        
        <p>Make this a Subscription?</p>
        <input type={'checkbox'} />
      </div>
      <div className={styles.account}>
        <div className={styles.loginPrompt}>
          {isLogged ? (<><p>{!usingAcc ? 'Use Account Info?' : 'Using Account'}</p><input type={'checkbox'} onChange={(e) => {setUsingAcc(e.target.checked)}} /></>) : (<p>Login to use Account info</p>)}
        </div>
        {!usingAcc && <input className={styles.email} type={'email'} placeholder='Email'></input>}
      </div>
      <div className={styles.separator}></div>
      <div className={styles.sub}>
        
      </div>
      {!usingAcc &&
          (<>
      <span className={styles.sub}>
        <p className={styles.shipTitle}>Shipping Address</p>
      </span>
      <div className={styles.shippingInputs}>
          <input className={styles.country} placeholder='Country'></input>
          <input className={styles.streetAdd} placeholder='Address'></input>
          <input className={styles.city} placeholder='City'></input>
          <input className={styles.state} placeholder='State'></input>
          <input className={styles.zip} type={'number'} placeholder='Zip'></input>
      </div></>)
      }
      {usingAcc && (<img src={logo}/>)}
      <div className={styles.separator}></div>
    </div>
    <CheckoutCart />
  </div>
  )
}

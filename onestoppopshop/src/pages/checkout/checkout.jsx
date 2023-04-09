import React, { useState, useContext, useRef, useEffect } from 'react'
import { CheckoutCart } from './checkoutCart'
import styles from './checkout.module.css'
import { ShopContext } from '../../context/shop-context'
import { CheckoutLogin } from './checkoutLogin'

export const Checkout = () => {
  const [usingAcc, setUsingAcc] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { authUser } = useContext(ShopContext)

  const loginRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (e) =>
    {
      if (loginRef.current && !loginRef.current.contains(e.target))
        setShowLogin(false)
      console.log(loginRef.current)
    }
    
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLogin])

  // Hide login splash if logged in.
  useEffect(() => {
    if (authUser) setShowLogin(false)
  }, [authUser])

  return (
  <div className={styles.checkoutPage}>
    <div className={styles.orderPanel}>
      <div className={styles.separator} />
      <div className={styles.orderPanelHeader}>
        <h1>Order Info</h1>        
        <p>Make this a Subscription?</p>
        <input type={'checkbox'} />
      </div>
      <div className={styles.account}>
        <div className={styles.loginPrompt}>
          {!authUser && (<p className={styles.loginBttn} onClick={() => setShowLogin(!showLogin)}>Login?</p>)}
          {showLogin && <div style={{width: "0%"}} ref={loginRef}><CheckoutLogin /></div>}
        </div>
        {!authUser ? (<input className={styles.email} type={'email'} placeholder='Email' />) : (<h1>Logged in as {authUser.email}</h1>)}
      </div>
      <div className={styles.separator} />
      <div className={styles.sub}>
        
      </div>
      <span className={styles.sub}>
        <p className={styles.shipTitle}>Shipping Address</p>
        <p>{!usingAcc ? 'Use Account Info?' : 'Using Account Info'}</p>
        <input type={'checkbox'} onChange={(e) => {setUsingAcc(e.target.checked)}} />
      </span>
      <div className={styles.shippingInputs}>
          <input className={styles.country} placeholder='Country' />
          <input className={styles.streetAdd} placeholder='Address' />
          <input className={styles.city} placeholder='City' />
          <input className={styles.state} placeholder='State' />
          <input className={styles.zip} type={'number'} placeholder='Zip' />
      </div>
      <div className={styles.separator} />
    </div>
    <CheckoutCart />
  </div>
  )
}

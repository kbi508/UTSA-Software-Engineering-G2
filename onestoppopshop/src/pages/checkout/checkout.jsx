import React, { useState, useContext, useRef, useEffect } from 'react'
import { CheckoutCart } from './checkoutCart'
import styles from './checkout.module.css'
import { ShopContext } from '../../context/shop-context'
import { CheckoutLogin } from './checkoutLogin'
import { auth, database } from '../../firebase'

export const Checkout = () => {
  const [usingAcc, setUsingAcc] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const { authUser, userAddress, userCity, userCountry, userState, userZip } = useContext(ShopContext)

  const loginRef = useRef(null)
  
  useEffect(() => {
    const handleClickOutside = (e) =>
    {
      if (loginRef.current && !loginRef.current.contains(e.target))
        setShowLogin(false)
    }
    
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showLogin])

  useEffect(() => {
    if (authUser) 
    {
      // Hide login splash if logged in:
      setShowLogin(false)
    }

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
        {authUser && <>
        <p>{!usingAcc ? 'Use Account Info?' : 'Using Account Info'}</p>
        <input type={'checkbox'} onChange={(e) => {setUsingAcc(e.target.checked)}} />
        </>} 
      </span>
      <div className={styles.shippingInputs}>
          {(authUser && usingAcc) ? 
          (<>
            <input className={styles.country} placeholder='Country' defaultValue={userCountry} />
            <input className={styles.streetAdd} placeholder='Address' defaultValue={userAddress} />
            <input className={styles.city} placeholder='City' defaultValue={userCity} />
            <input className={styles.state} placeholder='State' defaultValue={userState} />
            <input className={styles.zip} type={'number'} placeholder='Zip' defaultValue={userZip} /></>)
          :
          (<>
            <input className={styles.country} placeholder='Country' defaultValue={''} />
            <input className={styles.streetAdd} placeholder='Address' defaultValue={''} />
            <input className={styles.city} placeholder='City' defaultValue={''} />
            <input className={styles.state} placeholder='State' defaultValue={''} />
            <input className={styles.zip} type={'number'} placeholder='Zip' defaultValue={''} /></>)
          } 
      </div>
      <div className={styles.separator} />
    </div>
    <CheckoutCart />
  </div>
  )
}

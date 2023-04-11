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

  // Save shipping input values:
  const [country, setCountry] = useState('')
  const [add, setAdd] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [email, setEmail] = useState('')

  
  
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
      setEmail(authUser.email)
    }
  }, [authUser])

  const processUsingCheck = (e) => {
    setUsingAcc(e.target.checked)
    if (e.target.checked)
    {
      setAdd(userAddress)
      setCountry(userCountry)
      setCity(userCity)
      setState(userState)
      setZip(userZip)
    }
    else
    {
      setAdd('')
      setCountry('')
      setCity('')
      setState('')
      setZip('')
    }
  }

  const handleEmailChange = (e) => {

  }

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
        {!authUser ? (<input className={styles.email} type={'email'} placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>) : (<h1>Logged in as {authUser.email}</h1>)}
      </div>
      <div className={styles.separator} />
      <span className={styles.sub}>
        <p className={styles.shipTitle}>Shipping Address</p>
        {authUser && <>
        <p>{!usingAcc ? 'Use Account Info?' : 'Using Account Info'}</p>
        {/* <input type={'checkbox'} onChange={(e) => {setUsingAcc(e.target.checked)}} /> */}
        <input type={'checkbox'} onChange={(e) => processUsingCheck(e)} />
        </>} 
      </span>
      <div className={styles.shippingInputs}>
          {(authUser && usingAcc) ? 
          (<>
            <input className={styles.country} placeholder='Country' defaultValue={userCountry} onChange={(e) => setCountry(e.target.value)}/>
            <input className={styles.streetAdd} placeholder='Address' defaultValue={userAddress} onChange={(e) => setAdd(e.target.value)} />
            <input className={styles.city} placeholder='City' defaultValue={userCity} onChange={(e) => setCity(e.target.value)} />
            <input className={styles.state} placeholder='State' defaultValue={userState} onChange={(e) => setState(e.target.value)} />
            <input className={styles.zip} type={'number'} placeholder='Zip' defaultValue={userZip} onChange={(e) => setZip(e.target.value)} /></>)
          :
          (<>
            <input className={styles.country} placeholder='Country' defaultValue={''} onChange={(e) => setCountry(e.target.value)} />
            <input className={styles.streetAdd} placeholder='Address' defaultValue={''} onChange={(e) => setAdd(e.target.value)} />
            <input className={styles.city} placeholder='City' defaultValue={''} onChange={(e) => setCity(e.target.value)} />
            <input className={styles.state} placeholder='State' defaultValue={''} onChange={(e) => setState(e.target.value)} />
            <input className={styles.zip} type={'number'} placeholder='Zip' defaultValue={''} onChange={(e) => setZip(e.target.value)} /></>)
          } 
      </div>
      <div className={styles.separator} />
      <div className={styles.ccInputs}>
        <p>Payment</p>
        <input className={styles.ccNum} type={'number'} placeholder='Card Number' defaultValue={''} />
        <input className={styles.ccMonth} type={'month'} placeholder='Exp Date' defaultValue={''} />
        <input className={styles.ccCcv} type={'number'} placeholder='CCV' defaultValue={''} />
      </div>
      <div className={styles.separator} />
    </div>
    <CheckoutCart country={country} add={add} city={city} state={state} zip={zip} email={email}/>
  </div>
  )
}

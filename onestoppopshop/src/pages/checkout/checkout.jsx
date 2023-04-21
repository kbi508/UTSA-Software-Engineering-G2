import React, { useState, useContext, useRef, useEffect } from 'react'
import { CheckoutCart } from './checkoutCart'
import styles from './checkout.module.css'
import { ShopContext } from '../../context/shop-context'
import { CheckoutLogin } from './checkoutLogin'

export const Checkout = () => {
  const [usingAcc, setUsingAcc] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const { code, codes, setCode, codeGood, setCodeGood, checkCode, authUser, userAddress, userCity, userCountry, userState, userZip, fetchProducts, fetchCodes } = useContext(ShopContext)

  const loginRef = useRef(null)
  const discountRef = useRef(null)

  // Save shipping input values:
  const [country, setCountry] = useState('')
  const [add, setAdd] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [email, setEmail] = useState('')

  // Discount Code Message?
  const [codeMessage, setCodeMessage] = useState('')

  // Save CC info:
  const [ccNum, setCCNum] = useState('')
  const [ccDate, setCCDate] = useState('')
  const [ccv, setCCV] = useState('')

  useEffect(() => {
    fetchProducts()
    fetchCodes()
    setCode('')
  }, [])
  
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

  useEffect(() => {
    if (!code) {
      discountRef.current.classList.remove(styles.good)
      discountRef.current.classList.remove(styles.bad)
      setCodeGood(null)
      console.log('Clearing message...')
      setCodeMessage('')
    }
    else {
      checkCode(email)
      // if (authUser) {
      //   checkCode()
      // }
      // else if (email){
      //   checkCode(email)
      // }
      // else
      //   setCodeMessage('Enter in your email first')
    }
  }, [code, email])

  useEffect(() => {
    if (discountRef.current && code) {
      if (codeGood === null)
        return
      if (email) {
        if (codeGood) {
          console.log('Code is good! Commence Green!')
          setCodeMessage('Valid Code!')
          discountRef.current.classList.remove(styles.bad)
          discountRef.current.classList.add(styles.good)
        }
        else {
          console.log('Code is bad! Commence red!')
          if (Array.isArray(codes[code]?.userRedeemed) && codes[code]?.userRedeemed?.find((user) => user === email))
            setCodeMessage('Code Used!')
          else
            setCodeMessage('Invalid Code!')
          discountRef.current.classList.add(styles.bad)
          discountRef.current.classList.remove(styles.good)
        }
      }
      else {
        setCodeMessage('Enter in your email first')
      }
    }
  }, [codeGood, code])

  const processUsingCheck = (e) => {
    setUsingAcc(e.target.checked)
    if (e.target.checked)
    {
      console.log("Trying to use user data...")
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

  return (
  <div className={styles.checkoutPage}>
    <div className={styles.orderPanel}>
      <div className={styles.separator} />
      <div className={styles.orderPanelHeader}>
        <h1>Order Info</h1>        
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
        <input type={'checkbox'} onChange={(e) => processUsingCheck(e)} />
        </>} 
      </span>
      <div className={styles.shippingInputs}>
          <input className={styles.country} placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)}/>
          <input className={styles.streetAdd} placeholder='Address' value={add} onChange={(e) => setAdd(e.target.value)} />
          <input className={styles.city} placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
          <input className={styles.state} placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
          <input className={styles.zip} type={'number'} placeholder='Zip' value={zip} onChange={(e) => setZip(e.target.value)} />
      </div>
      <div className={styles.separator} />
      <div className={styles.discount}>
        <p>Discount Code</p>
        <input ref={discountRef} className={`${styles.discountText}`} placeholder='Enter Code if Applicable' value={code} onChange={(e) => setCode((e.target.value).toUpperCase())}/>
        {codeMessage && <p>{codeMessage}</p>}
      </div>
      <div className={styles.separator} />
      <div className={styles.ccInputs}>
        <p>Payment</p>
        <input className={styles.ccNum} type={'number'} placeholder='Card Number' value={ccNum} onChange={(e) => setCCNum(e.target.value)} />
        <input className={styles.ccMonth} type={'month'} placeholder='Exp Date' value={ccDate} onChange={(e) => setCCDate(e.target.value)} />
        <input className={styles.ccCcv} type={'number'} placeholder='CCV' value={ccv} onChange={(e) => setCCV(e.target.value)} />
      </div>
      <div className={styles.separator} />
    </div>
    <CheckoutCart country={country} add={add} city={city} state={state} zip={zip} email={email} ccNum={ccNum} ccDate={ccDate} ccv={ccv}/>
  </div>
  )
}

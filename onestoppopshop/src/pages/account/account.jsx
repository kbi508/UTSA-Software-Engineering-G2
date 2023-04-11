import React, { useContext, useState, useEffect } from 'react'
import styles from './account.module.css'
import { ShopContext } from '../../context/shop-context'
import { database } from '../../firebase'
import { update, ref } from 'firebase/database'
import { AccountLogin } from './accountLogin'

export const Account = () => {
  const [curTab, setCurTab] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { authUser, userAddress, userCity, userCountry, userState, userZip, updateUserInfo } = useContext(ShopContext)

  // Capture updated address values:
  const [updateCountry, setUpdateCountry] = useState(userCountry)
  const [updateAddress, setUpdateAddress] = useState(userAddress)
  const [updateCity, setUpdateCity] = useState(userCity)
  const [updateState, setUpdateState] = useState(userState)
  const [updateZip, setUpdateZip] = useState(userZip)


  const saveUpdatesToAddress = () => {
    if (userAddress !== updateAddress || userCity !== updateCity || userCountry !== updateCountry || userState !== updateState || userZip !== updateZip)
    {
      const userRef = ref(database, "users/" + authUser.uid)
      update(userRef, {
        address: updateAddress, 
        city: updateCity,
        country: updateCountry,
        state: updateState,
        zip: updateZip
      })
      updateUserInfo()
    }
    setShowConfirmation(true)
    setTimeout(() => {setShowConfirmation(false)}, 3000)
  }

  return (
    <div className={styles.accPage}>
      <div className={styles.tabBttns}>
        <button className={styles.orderBttn} onClick={() => setCurTab(1)}>Orders</button>
        <button className={styles.shipBttn}  onClick={() => setCurTab(2)}>Account Info</button>
      </div>
      <div className={styles.tabs}>
        <div className={styles.accInfo}>
          <p className={styles.accEmail}>{authUser.email}</p>
          <button className={styles.deleteBttn} onClick={() => setShowLogin(!showLogin)}>Delete Account</button>
          {showLogin && <AccountLogin setShowLogin={setShowLogin}/>}
        </div>
        {curTab === 1 && (<div className={styles.tabOrders}>
          <div className={styles.orderHeader}><span>Order Number</span> <span>Total</span> <span>Date</span></div>
          <ul>
            {/* Query from DB and create <li></li> */}
          </ul>
        </div>)}
        {curTab === 2 && (
        <div className={styles.tabShippingInfo}>
          <p>Shipping Address</p>
          <input className={styles.country} placeholder='Country' defaultValue={userCountry} onChange={(e) => setUpdateCountry(e.target.value)} />
          <input className={styles.streetAdd} placeholder='Address' defaultValue={userAddress} onChange={(e) => setUpdateAddress(e.target.value)} />
          <input className={styles.city} placeholder='City' defaultValue={userCity} onChange={(e) => setUpdateCity(e.target.value)} />
          <input className={styles.state} placeholder='State' defaultValue={userState} onChange={(e) => setUpdateState(e.target.value)} />
          <input className={styles.zip} type={'number'} placeholder='Zip' defaultValue={userZip} onChange={(e) => setUpdateZip(e.target.value)} />
          {showConfirmation && <p>Address updated!</p>}
          <button className={styles.updateBttn} onClick={saveUpdatesToAddress}>Update</button>
        </div>)}
      </div>
    </div>
  )
}

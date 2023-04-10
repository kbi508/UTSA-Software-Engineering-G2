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
  const { authUser, userAddress, userCity, userCountry, userState, userZip, userCredit, updateUserInfo, deleteAccount } = useContext(ShopContext)

  // Capture updated address values:
  const [updateCountry, setUpdateCountry] = useState(userCountry)
  const [updateAddress, setUpdateAddress] = useState(userAddress)
  const [updateCity, setUpdateCity] = useState(userCity)
  const [updateState, setUpdateState] = useState(userState)
  const [updateZip, setUpdateZip] = useState(userZip)

  const accountOrders = [
    {
      id: 1,
      date: '01/01/2020',
      total: 36
    },
    {
      id: 2,
      date: '01/01/2020',
      total: 12
    },
    {
      id: 3,
      date: '01/01/2020',
      total: 230
    }
  ]

  const accountSubs = [
    'This is first subscript',
    'This is second subscript',
    'This is third subscript'
  ]

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
        <button className={styles.subBttn}   onClick={() => setCurTab(2)}>Subscriptions</button>
        <button className={styles.shipBttn}  onClick={() => setCurTab(3)}>Account Info</button>
      </div>
      <div className={styles.tabs}>
        <div className={styles.accInfo}>
          <div className={styles.topWrapper}>
            <p className={styles.accEmail}>{authUser.email}</p>
            <button className={styles.deleteBttn} onClick={() => setShowLogin(!showLogin)}>Delete Account</button>
            {showLogin && <AccountLogin setShowLogin={setShowLogin}/>}
          </div>
          <p>Credit Balance: ${Number(userCredit).toFixed(2)}</p>
        </div>
        {curTab === 1 && (<div className={styles.tabOrders}>
          <div className={styles.orderHeader}><span>Order Number</span> <span>Total</span> <span>Date</span></div>
          <ul>
            {accountOrders.map((order) => <li key={order.id}><span className={styles.idSpan}>{order.id}</span> <span className={styles.totalSpan}>${Number(order.total).toFixed(2)}</span> <span className={styles.dateSpan}>{order.date}</span></li>)}
          </ul>
        </div>)}
        {curTab === 2 && (<div className={styles.tabSubscripts}>
          <ul>
            {accountSubs.map((sub) => <div>{sub}</div>)}
          </ul>
        </div>)}
        {curTab === 3 && (
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

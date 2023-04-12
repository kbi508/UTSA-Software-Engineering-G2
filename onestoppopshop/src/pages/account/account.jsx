import React, { useContext, useState, useEffect } from 'react'
import styles from './account.module.css'
import { ShopContext } from '../../context/shop-context'
import { database } from '../../firebase'
import { update, ref, get } from 'firebase/database'
import { AccountLogin } from './accountLogin'
import { Orderbox } from './orderbox'



export const Account = () => {
  const [curTab, setCurTab] = useState(2)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [orders, setOrders] = useState([])
  const { authUser, userAddress, userCity, userCountry, userState, userZip, updateUserInfo } = useContext(ShopContext)

  // Capture updated address values:
  const [updateCountry, setUpdateCountry] = useState(userCountry)
  const [updateAddress, setUpdateAddress] = useState(userAddress)
  const [updateCity, setUpdateCity] = useState(userCity)
  const [updateState, setUpdateState] = useState(userState)
  const [updateZip, setUpdateZip] = useState(userZip)

  // Get orders into a list:
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = ref(database, 'orders')
        const snapshot = await get(ordersRef)
        if (snapshot.exists()) {
          const data = snapshot.val()
          const orderNumbers = Object.keys(data)
          const tempOrders = Object.values(data)
          tempOrders.forEach((order, index) => {
            order.key = orderNumbers[index]
          })
          // Filter out orders that are not from this customer:
          const finalOrders = tempOrders.filter((order) => order.email === authUser.email)

          setOrders(finalOrders)
        } else {
          return [] // Return an empty array if snapshot does not exist
        }
      } catch (error) {
        console.log(error)
        return [] // Return an empty array in case of an error
      }
    }

    fetchOrders()
  }, [])


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
        <button className={styles.shipBttn}  onClick={() => setCurTab(2)}>Account Info</button>
        <button className={styles.orderBttn} onClick={() => setCurTab(1)}>Orders</button>
      </div>
      <div className={styles.tabs}>
        {curTab === 1 && (
        <div className={styles.tabOrders}>
          {orders.map((order) => {
            return <Orderbox key={order.key} data={order}/>
          })}
        </div>)}
        {curTab === 2 && (
        <div className={styles.tabShippingInfo}>
          <div className={styles.accInfo}>
            <p className={styles.accEmail}>{authUser.email}</p>
            <button className={styles.deleteBttn} onClick={() => setShowLogin(!showLogin)}>Delete Account</button>
            {showLogin && <AccountLogin setShowLogin={setShowLogin}/>}
          </div>
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

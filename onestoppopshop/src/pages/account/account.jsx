import React, { useContext, useState } from 'react'
import styles from './account.module.css'
import { ShopContext } from '../../context/shop-context'

export const Account = () => {
  const [curTab, setCurTab] = useState(1)
  const { authUser, userAddress, userCity, userCountry, userState, userZip, userCredit } = useContext(ShopContext)

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

  return (
    <div className={styles.accPage}>
      <div className={styles.tabBttns}>
        <button className={styles.orderBttn} onClick={() => setCurTab(1)}>Orders</button>
        <button className={styles.subBttn}   onClick={() => setCurTab(2)}>Subscriptions</button>
        <button className={styles.shipBttn}  onClick={() => setCurTab(3)}>Account Info</button>
      </div>
      <div className={styles.tabs}>
        <div className={styles.accInfo}>
          <p className={styles.accEmail}>{authUser.email}</p>
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
          <input className={styles.country} placeholder='Country' value={userCountry} />
          <input className={styles.streetAdd} placeholder='Address' value={userAddress} />
          <input className={styles.city} placeholder='City' value={userCity} />
          <input className={styles.state} placeholder='State' value={userState} />
          <input className={styles.zip} type={'number'} placeholder='Zip' value={userZip} />
          <button className={styles.updateBttn}>Update</button>
        </div>)}
      </div>
    </div>
  )
}

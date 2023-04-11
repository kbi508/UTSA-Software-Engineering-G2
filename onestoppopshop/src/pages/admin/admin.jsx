import React from 'react'
import styles from './admin.module.css'
import { ORDERS, USERS, CODES } from './spoof'
import { PRODUCTS } from '../../products'
import { AdminItem } from './adminItem'

export const Admin = () => {
  return (
    <div className={styles.adminPage}>
        <div className={styles.orders}>
            <div className={styles.orderItems}>
                <div className={styles.orderHeader}></div>
                {ORDERS.map((order) => {
                    if (order.active)
                        return <AdminItem data = {order}/>
                    return <></>
                })}
            </div>
            <div className={styles.orderItems}>

            </div>
        </div>

        <div className={styles.users}>

        </div>

        <div className={styles.items}>

        </div>

        <div className={styles.discountCodes}>

        </div>
    </div>
  )
}

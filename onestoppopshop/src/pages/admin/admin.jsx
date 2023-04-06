import React from 'react'
import styles from './admin.module.css'

export const Admin = () => {
  return (
    <div className={styles.adminPage}>
        <div>
            <div className={styles.curOrders}>

            </div>
            <div className={styles.pastOrders}>

            </div>
        </div>

        <div className={styles.users}>

        </div>

        <div className={styles.items}>
            
        </div>
    </div>
  )
}

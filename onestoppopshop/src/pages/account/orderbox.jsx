import React from 'react'
import styles from './orderbox.module.css'

export const Orderbox = (props) => {
  return (
    <div className={styles.orderBox}>
        <p className={styles.orderNum}>Order # {props.data.key}</p>
        <div>
            <p className={styles.date}><b>Date:</b> {props.data.date}</p>
            <p className={styles.total}><b>Total:</b> ${Number(props.data.amount).toFixed(2)}</p>
        </div>
        <div className={styles.add}>
            <p className={styles.shipTo}><b>Ship to:</b></p>
            <div>
                <p>{props.data.add}</p>
                <p>{props.data.city}, {props.data.state}</p>
                <p>{props.data.country}, {props.data.zip}</p>
            </div>
        </div>
        <div className={styles.items}>
            
        </div>
    </div>
  )
}

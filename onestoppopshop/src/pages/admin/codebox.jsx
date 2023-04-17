import React from 'react'
import styles from './codebox.module.css'

export const Codebox = (props) => {
  return (
    <>
        <p>{props.codeName}</p>
        <p>Times Redeemed: {props.data.numRedeemed}</p>
        <p>Discount: {(props.data.discount)*100}%</p>
        <button className={styles.lightBttn} onClick={() => props.deleteCode(props.codeName)}>Delete</button>
    </>
  )
}

import React from 'react'
import styles from './userbox.module.css'

export const Userbox = (props) => {
  return (
    <div className={styles.userbox}>
        <p>{props.data.email}</p>
    </div>
  )
}

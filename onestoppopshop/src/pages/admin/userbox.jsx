import React, { useState } from 'react'
import styles from './userbox.module.css'

export const Userbox = (props) => {

  return (
    <div className={props.selected === props.data.email ? (`${styles.userbox} ${styles.selected}`) : (styles.userbox)} onClick={() => props.selectUser(props.data.email)}>
        <p>{props.data.email}</p>
    </div>
  )
}

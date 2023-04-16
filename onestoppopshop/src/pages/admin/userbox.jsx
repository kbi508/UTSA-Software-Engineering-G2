import React, { useState } from 'react'
import styles from './userbox.module.css'

export const Userbox = (props) => {

  return (
    <div className={props.selected === props.uid ? (`${styles.userbox} ${styles.selected}`) : (styles.userbox)} onClick={() => props.selectUser(props.uid)}>
        <p>{props.data.email}</p>
    </div>
  )
}

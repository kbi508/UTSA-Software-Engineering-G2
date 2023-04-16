import React, { useState } from 'react'
import styles from './userbox.module.css'
import { auth } from '../../firebase'

export const Userbox = (props) => {
  const [isAdmin, setIsAdmin] = useState(props.data.admin)
  const promoteUser = (userEmail) => {
    auth.getUserByEmail(userEmail)
    .then((userRef) => {
      console.log(userRef.uid)
      // auth.deleteUser(userRef.uid)
    })
    .catch((error) => console.log(error))
  }

  return (
    <div className={props.selected === props.data.email ? (`${styles.userbox} ${styles.selected}`) : (styles.userbox)} onClick={() => props.selectUser(props.data.email)}>
        <p>{props.data.email}</p>
        <button className={styles.deleteBttn} onClick={() => promoteUser(props.data.email)}>{isAdmin ? ('Demote') : ('Promote')}</button>
    </div>
  )
}

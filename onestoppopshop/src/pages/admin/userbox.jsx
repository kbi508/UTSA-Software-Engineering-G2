import React, { useState } from 'react'
import { ref, update } from 'firebase/database'
import styles from './userbox.module.css'
import { database } from '../../firebase'

export const Userbox = (props) => {
  const [isAdmin, setIsAdmin] = useState(props.data.admin)

  const promoteUser = () => {
    const userRef = ref(database, 'users/' + props.uid)
    if (!isAdmin) {
      update(userRef, {
        admin: true
      })
      .then(() => {
        setIsAdmin(true)
      })
      .catch((error) => console.log(error))
    }
    else {
      update(userRef, {
        admin: false
      })
      .then(() => {
        setIsAdmin(false)
      })
      .catch((error) => console.log(error))
    }
  }

  return (
    <div className={props.selected === props.data.email ? (`${styles.userbox} ${styles.selected}`) : (styles.userbox)} onClick={() => props.selectUser(props.data.email)}>
        <p>{props.data.email}</p>
        <button className={isAdmin ? (`${styles.promoteBttn} ${styles.selected}`) : (styles.promoteBttn)} onClick={() => promoteUser()}>{isAdmin ? ('Demote') : ('Promote')}</button>
    </div>
  )
}

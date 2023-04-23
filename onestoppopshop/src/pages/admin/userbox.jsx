import React, { useContext, useState } from 'react'
import { ref, update } from 'firebase/database'
import styles from './userbox.module.css'
import { database } from '../../firebase'
import { ShopContext } from '../../context/shop-context'

export const Userbox = (props) => {
  const { authUser, authIsAdmin, setAuthIsAdmin } = useContext(ShopContext)
  const [isAdmin, setIsAdmin] = useState(props.data.admin)

  const promoteUser = (e) => {
    e.stopPropagation()
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
        if (authIsAdmin && authUser.email === props.data.email)
          setAuthIsAdmin(false)
      })
      .catch((error) => console.log(error))
    }
  }

  return (
    <div className={props.selected === props.data.email ? (`${styles.userbox} ${styles.selected}`) : (styles.userbox)} onClick={() => props.selectUser(props.data.email)}>
        <p>{props.data.email}</p>
        <button className={isAdmin ? (`${styles.promoteBttn} ${styles.selected}`) : (styles.promoteBttn)} onClick={(e) => promoteUser(e)}>{isAdmin ? ('Demote') : ('Promote')}</button>
    </div>
  )
}

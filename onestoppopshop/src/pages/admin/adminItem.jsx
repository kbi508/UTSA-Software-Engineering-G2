import React from 'react'
import styles from './adminItem.module.css'

export const AdminItem = (props) => {
  return (
    <div className={styles.container}>
        {Object.values(props.data).map((item) => {
            return <span>{item}</span>
        })}
    </div>
  )
}

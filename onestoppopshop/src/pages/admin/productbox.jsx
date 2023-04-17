import React from 'react'
import styles from './productbox.module.css'

export const Productbox = (props) => {
  return (
    <div className={styles.productbox} onClick={() => props.productScreen()}>
        <img src={props.data.product_Image} />
    </div>
  )
}

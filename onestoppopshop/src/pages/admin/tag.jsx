import React from 'react'
import styles from './tag.module.css'

export const Tag = (props) => {
  return (
    <div className={styles.tag}>
        <p>{props.text}</p>
        <button onClick={() => props.removeTag(props.text)}>X</button>
    </div>
  )
}

import React, { useEffect, useRef } from 'react'
import styles from './login.module.css'

export const Login = () => {
    return (
    <div className={styles.loginSplash}>
        <div className={styles.inputs}>
            <input className={styles.email} placeholder='Email' type={'email'}></input>
            <input className={styles.pass} placeholder='Password' type={'password'}></input>
        </div>
        <div className={styles.bttns}>
            <button>Submit</button>
        </div>
    </div>
  )
}

import React, { useState, useContext } from 'react'
import styles from './accountLogin.module.css'
import { ShopContext } from '../../context/shop-context'

export const AccountLogin = (props) => {
    const { email, password, loginError, setEmail, setPassword, deleteAccount} = useContext(ShopContext)

    return (
    <div className={styles.darken}>
        <div className={styles.loginSplash}>
            <form onSubmit={deleteAccount}>
                <p>Are you sure you want to permenantly delete your account?</p>
                <div className={styles.inputs}>
                    <input className={styles.email} placeholder='Email' type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className={styles.pass} placeholder='Password' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                {loginError && 
                <div className={styles.error}>
                    <p>{loginError.message}</p>
                </div>}
                <div className={styles.bttns}>
                    <button className={styles.confirmBttn} type='submit'>Confirm</button>
                    <button className={styles.cancelBttn} type='button' onClick={() => props.setShowLogin(false)}>Cancel</button>
                </div>
            </form>
        </div>
    </div>
  )
}

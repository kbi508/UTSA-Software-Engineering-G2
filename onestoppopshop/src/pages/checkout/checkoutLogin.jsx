import React, { useState, useContext } from 'react'
import styles from './checkoutLogin.module.css'
import { ShopContext } from '../../context/shop-context'

export const CheckoutLogin = () => {
    const [isCreating, setIsCreating] = useState(false)
    const {signIn, signUp, email, password, loginError, setEmail, setPassword} = useContext(ShopContext)

    return (
    <div className={styles.loginSplash}>
        <form onSubmit={!isCreating ? signIn : signUp}>
            <div className={styles.inputs}>
                <input className={styles.email} placeholder='Email' type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className={styles.pass} placeholder='Password' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            {loginError && 
            <div className={styles.error}>
                <p>{loginError.message}</p>
            </div>}
            <div className={styles.bttns}>
                <button className={styles.loginBttn} type='submit'>{isCreating ? ('Create') : ('Log in')}</button>
                <button className={styles.createBttn} type='button' onClick={() => setIsCreating(!isCreating)}>{!isCreating ? ('Create Account?') : ('Login Account?')}</button>
            </div>
        </form>
    </div>
  )
}

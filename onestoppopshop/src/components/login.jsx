import React, { useState, useContext, useEffect } from 'react'
import styles from './login.module.css'
import { ShopContext } from '../context/shop-context'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'

export const Login = () => {
    const [isCreating, setIsCreating] = useState(false)
    const {signIn, signUp, email, password, loginError, setEmail, setPassword, setLoginError} = useContext(ShopContext)

    const recoverPass = (e) => {
        e.preventDefault()
        if (!email) {
            setLoginError('Enter Email First!')
            return
        }
        sendPasswordResetEmail(auth, (email.toString()))
        .then(() => {
            setLoginError('Email Sent!')
        })
        .catch((error) => setLoginError(error.message))
    }

    return (
    <div className={styles.loginSplash}>
        <form onSubmit={!isCreating ? signIn : signUp}>
            <div className={styles.inputs}>
                <input className={styles.email} placeholder='Email' type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <input className={styles.pass} placeholder='Password' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            {loginError && 
            <div className={styles.error}>
                <p>{loginError}</p>
            </div>}
            <div className={styles.bttns}>
                <button className={styles.loginBttn} type='submit'>{isCreating ? ('Create') : ('Log In')}</button>
                {!isCreating && <button className={styles.forgotBttn} type='button' onClick={(e) => recoverPass(e)} >Forgot Password?</button>}
                <button className={styles.createBttn} type='button' onClick={() => setIsCreating(!isCreating)}>{!isCreating ? ('Create Account?') : ('Login Account?')}</button>
            </div>
        </form>
    </div>
  )
}

import React, { useState, useEffect, useContext } from 'react'
import styles from './login.module.css'
import { ShopContext } from '../context/shop-context'

export const Login = () => {
    const [isCreating, setIsCreating] = useState(false)
    const {authUser, signIn, signUp, userSignOut, email, password, setEmail, setPassword} = useContext(ShopContext)

    return (
    <div className={styles.loginSplash}>
        <form onSubmit={!isCreating ? signIn : signUp}>
            {!authUser ? 
            (<>
                <div className={styles.inputs}>
                    <input className={styles.email} placeholder='Email' type={'email'} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                    <input className={styles.pass} placeholder='Password' type={'password'} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className={styles.bttns}>
                    <button className={styles.loginBttn} type='submit'>{isCreating ? ('Create') : ('Log in')}</button>
                    <button className={styles.createBttn} type='button' onClick={() => setIsCreating(!isCreating)}>{!isCreating ? ('Create Account?') : ('Login Account?')}</button>
                </div>
            </>)
            :
            (<>
                <p>{`Signed in as ${authUser.email}`}</p>
                <div className={styles.bttns}>
                    <button className={styles.logoutBttn} type='button' onClick={userSignOut}>Logout</button>
                </div>
            </>)}
        </form>
    </div>
  )
}

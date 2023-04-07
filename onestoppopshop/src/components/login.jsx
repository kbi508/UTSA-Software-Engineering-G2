import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import styles from './login.module.css'
import { auth } from '../firebase'
import {AuthDetails} from './authdetails'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const [authUser, setAuthUser] = useState(null)

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {})
        .catch((error) => {console.log('Failure!' + error)})
    }

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {console.log('Success!' + userCredential)})
        .catch((error) => {console.log('Failure!' + error)})
    }

    const userSignOut = () => {
        signOut(auth)
        .then(() => console.log('Success!'))
        .catch((error) => console.log(error))
    }


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            }
            else 
                setAuthUser(null)
        })

        return () => listen()
    }, [])

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

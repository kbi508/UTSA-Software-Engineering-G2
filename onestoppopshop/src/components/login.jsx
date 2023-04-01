import React from 'react'
import styles from './login.module.css'

export const Login = () => {
  return (
    <div className='login-splash'>
        <input className='email' placeholder='Email' type={'email'}></input>
        <input className='pass' placeholder='Password' type={'password'}></input>
    </div>
  )
}

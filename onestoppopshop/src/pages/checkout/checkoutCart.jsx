import React, { useContext, useEffect, useState } from 'react'
import { CheckoutCartItem } from './checkoutCartItem'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCart.module.css'
import { useNavigate } from 'react-router-dom'

export const CheckoutCart = (props) => {
  const { products, setProducts, cartItems, getTotalCartAmount, numCartItems, processCheckout, taxRate, resetCart, codeGood, code, codes } = useContext(ShopContext)
  const {country, add, city, state, zip, email, ccNum, ccDate, ccv} = props
  const [totalAmount, setTotalAmount] = useState(getTotalCartAmount().toFixed(2))
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState('')
  const navigator = useNavigate()
  const [orderSuccess, setOrderSuccess] = useState(false)

  useEffect(() => {
    if (codeGood) {
      setTotalAmount(Number(getTotalCartAmount() * (1-codes[code]?.discount)).toFixed(2))
    }
    else
      setTotalAmount(getTotalCartAmount().toFixed(2))
  }, [codeGood])

  const checkoutWrapper = (country, add, city, state, zip, email) => {
    let canCheckout = true
    if (email === '')
    {
      setMessage('Your email is not filled in. Please provide an email so we can reach out to you about your order!')
      canCheckout = false
    }
    else if (country === '' || add === '' || city === '' || state === '' || zip === '')
    {
      setMessage('Your address is not fully filled in. Please fill in each field!')
      canCheckout = false
    }
    // Check that there are at least SOME CC dets:
    console.log(ccNum)
    if (ccNum === '' || ccDate === '' || ccv === '')
    {
      setMessage('You must enter in your Payment Details!')
      canCheckout = false
    }

    if (canCheckout)
    {
      const orderKey = processCheckout(country, add, city, state, zip, email)
      setMessage("Your Order (#" + orderKey +") has Been Processed! ")
      setOrderSuccess(true)
    }
    setShowConfirm(true)
  }

  const confirm = () => {
    if (orderSuccess)
    {
      resetCart()
      navigator('/')
    }
    else {
      setMessage('')
      setShowConfirm(false)
    }
  }

  return (
    <div className={styles.checkoutCart}>
        <div className={styles.cartItems}>
            {products.map((product) => {
                if (product && cartItems[product.prodNum] > 0)
                  return <CheckoutCartItem key={product.prodNum} prodNum={product.prodNum} data={product} />
                return <></>
            })}
        </div>

        <div className={styles.checkout}>
            <p>Subtotal: ${totalAmount} {codeGood && '(' + Number(codes[code]?.discount*100) + '% off!)'}</p>
            <p>Sales Tax Added ({Number(taxRate*100).toFixed(2)}%): ${Number(totalAmount*taxRate).toFixed(2)}</p>
            <p>Total: ${Number(totalAmount*(1+taxRate)).toFixed(2)}</p>
            <button className={`${styles.orderBttn} ${styles.cartBttn}`} disabled={numCartItems === 0 ? true : false} onClick={() => checkoutWrapper(country, add, city, state, zip, email)}> Place Order </button>
            <button className={`${styles.cancelBttn} ${styles.cartBttn}`} onClick={() => navigator('/')}> Cancel </button>
        </div>

        {showConfirm &&
        <div className={styles.confirmationBackdrop}>
          <div className={styles.confirmation}>
            <h1>{orderSuccess ? 'Order Processed' : 'Error'}</h1>
            <p>{message}</p>
            <button className={styles.confirmBttn} onClick={() => confirm()}>Confirm</button>
          </div>
        </div>}
    </div>
  )
}

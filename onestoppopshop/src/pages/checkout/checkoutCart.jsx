import React, { useContext, useState } from 'react'
import { PRODUCTS } from '../../products'
import { CheckoutCartItem } from './checkoutCartItem'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCart.module.css'
import { useNavigate } from 'react-router-dom'

export const CheckoutCart = () => {
  const { cartItems, getTotalCartAmount, numCartItems, processCheckout } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const navigator = useNavigate()

  return (
    <div className={styles.checkoutCart}>
        <div className={styles.cartItems}>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                  return <CheckoutCartItem data={product} />
                return <></>
            })}
        </div>

        <div className={styles.checkout}>
            <p>Subtotal: ${Number(totalAmount).toFixed(2)}</p>
            <p>Sales Tax Added (8.25%): ${Number(totalAmount*.0825).toFixed(2)}</p>
            <p>Total: ${Number(totalAmount*1.0825).toFixed(2)}</p>
            <button className={`${styles.orderBttn} ${styles.cartBttn}`} disabled={numCartItems === 0 ? true : false} onClick={processCheckout}> Place Order </button>
            <button className={`${styles.cancelBttn} ${styles.cartBttn}`} onClick={() => navigator('/')}> Cancel </button>
        </div>
    </div>
  )
}

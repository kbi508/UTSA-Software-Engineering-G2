import React, { useContext, useState } from 'react'
import { PRODUCTS } from '../../products'
import { CheckoutCartItem } from './checkoutCartItem'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCart.module.css'

export const CheckoutCart = (props) => {
  const { cartItems, getTotalCartAmount, toggleOpen } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)

  const [tempCred, setTempCred] = useState(100)

  const chargeCredit = (amount) => {

  }


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
            <p>Subtotal: ${totalAmount}</p>
            <p>Credit: {tempCred} - ${totalAmount} = {tempCred-totalAmount}</p>
            <button className={`${styles.orderBttn} ${styles.cartBttn}`} > Place Order </button>
            {/* <button className={`${styles.cancelBttn} ${styles.cartBttn}`}> Cancel </button> */}
        </div>
    </div>
  )
}

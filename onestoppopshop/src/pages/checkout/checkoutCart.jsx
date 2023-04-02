import React, { useContext, useState } from 'react'
import { PRODUCTS } from '../../products'
import { CheckoutCartItem } from './checkoutCartItem'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCart.module.css'
import { useNavigate } from 'react-router-dom'

export const CheckoutCart = (props) => {
  const { cartItems, getTotalCartAmount, toggleOpen } = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const navigator = useNavigate()

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
            <p>Subtotal: ${Number(totalAmount).toFixed(2)}</p>
            <p>Credit: ${Number(tempCred).toFixed(2)} - ${Number(totalAmount).toFixed(2)} = {Number(tempCred-totalAmount).toFixed(2)}</p>
            <button className={`${styles.orderBttn} ${styles.cartBttn}`} > Place Order </button>
            <button className={`${styles.cancelBttn} ${styles.cartBttn}`} onClick={() => navigator('/')}> Cancel </button>
        </div>
    </div>
  )
}

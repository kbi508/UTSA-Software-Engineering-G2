import React, { useContext, useEffect, useRef } from 'react'
import { PRODUCTS } from '../products'
import { CartItem } from './cartItem'
import {ShopContext} from '../context/shop-context'
import styles from './cart.module.css'
import { Link } from 'react-router-dom'

export const Cart = (props) => {
  const { cartItems, setCartItems, getTotalCartAmount, toggleOpen, getDefaultCart} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const cart = useRef(null)

  const { isOpen } = useContext(ShopContext)

  useEffect(() => {
    if(cart.current)
      cart.current.classList.toggle(styles.active)
  }, [isOpen])

  const resetCart = () => {
    const temp = getDefaultCart()
    setCartItems(temp)
  }


  return (
    <div ref={cart} className={styles.cart}>
        <div className={styles.xBttn} onClick={toggleOpen}>X</div>

        <div className={styles.cartItems}>
            {PRODUCTS.map((product) => {
                if (cartItems[product.id] > 0)
                  return <CartItem data={product}/>
            })}
        </div>

        <div className={styles.checkout}>
            <p>Subtotal: ${Number(totalAmount).toFixed(2)}</p>
            <button className={`${styles.checkoutBttn} ${styles.cartBttn}`}> <Link className={styles.checkoutLink} to='/checkout'> Checkout</Link> </button>
            <button className={`${styles.clearBttn} ${styles.cartBttn}`} onClick={resetCart}> Clear Cart </button>
        </div>
    </div>
  )
}

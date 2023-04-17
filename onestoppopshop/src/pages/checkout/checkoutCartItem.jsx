import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCartItem.module.css'

export const CheckoutCartItem = (props) => {
  const { name, price, product_Image } = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className={styles.cartItem}>
      <img src={product_Image} alt={name}/>
      <p className={styles.descriptText}><b>{name}</b></p>
      <div className={styles.countHandler}>
        <button onClick={() => removeFromCart(props.prodNum)}>-</button>
        <input value={cartItems[props.prodNum]} onChange={(e) => updateCartItemCount(Number(e.target.value), props.prodNum)}></input>
        <button onClick={() => addToCart(props.prodNum)}>+</button>
      </div>
      <p className={styles.price}>x ${Number(price).toFixed(2)}</p>
    </div>
  )
}

import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCartItem.module.css'

export const CheckoutCartItem = (props) => {
  const { name, price, product_Image, prodNum, onsale, salepercent } = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className={styles.cartItem}>
      <img src={product_Image} alt={name}/>
      <p className={styles.descriptText}><b>{name}</b></p>
      <div className={styles.countHandler}>
        <button onClick={() => removeFromCart(prodNum)}>-</button>
        <input value={cartItems[prodNum]} onChange={(e) => updateCartItemCount(Number(e.target.value), prodNum)}></input>
        <button onClick={() => addToCart(prodNum)}>+</button>
      </div>
      <p className={styles.price}>x ${onsale ? (Number(price * (1-salepercent)).toFixed(2)) : (Number(price).toFixed(2))}</p>
    </div>
  )
}

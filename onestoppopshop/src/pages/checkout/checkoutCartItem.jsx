import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './checkoutCartItem.module.css'

export const CheckoutCartItem = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className={styles.cartItem}>
      <img src={productImage} alt={productName}/>
      <p className={styles.descriptText}><b>{productName}</b></p>
      <div className={styles.countHandler}>
        <button onClick={() => removeFromCart(id)}>-</button>
        <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}></input>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
      <p className={styles.price}>x ${Number(price).toFixed(2)}</p>
    </div>
  )
}

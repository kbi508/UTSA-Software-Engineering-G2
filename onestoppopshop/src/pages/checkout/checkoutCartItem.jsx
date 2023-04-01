import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import './checkoutCartItem.css'

export const CheckoutCartItem = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className='cart-item'>
      <img src={productImage} alt={productName}/>
      <p className='descript-text'><b>{productName}</b></p>
      <div className='countHandler'>
        <button onClick={() => removeFromCart(id)}>-</button>
        <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}></input>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
      <p className='price'>x ${price}</p>
    </div>
  )
}

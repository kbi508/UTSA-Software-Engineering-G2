import React, { useContext } from 'react'
import {ShopContext} from '../context/shop-context'

export const CartItem = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } = useContext(ShopContext)

  return (
    <div className='cart-item'>
        <img src={productImage} alt={productName}/>
        <div className='descript'>
            <p><b>{productName}</b></p>
            <p>$ {price}</p>
            <div className='countHandler'>
                <button onClick={() => removeFromCart(id)}>-</button>
                <input value={cartItems[id]} onChange={(e) => updateCartItemCount(Number(e.target.value), id)}></input>
                <button onClick={() => addToCart(id)}>+</button>
            </div>
        </div>
    </div>
  )
}

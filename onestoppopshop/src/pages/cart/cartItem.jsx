import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'

export const CartItem = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { cartItems } = useContext(ShopContext)

  return (
    <div className='cart-item'>
        <img src={productImage}/>
        <div className='descript'>
            <p><b>{productName}</b></p>
            <p>$ {price}</p>
            <div className='countHandler'>
                <button>-</button>
                <input value={cartItems[id]}></input>
                <button>+</button>
            </div>
        </div>
    </div>
  )
}

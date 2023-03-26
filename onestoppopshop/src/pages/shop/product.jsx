import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'

export const Product = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { addToCart, cartItems } = useContext(ShopContext)

  const cartItemsAmount = cartItems[id]
  return (
    <div className='product'>
        <img src={productImage} alt='Product'/>
        <div className='prod-desc'>
            <p><b>{productName}</b></p>
            <p>${price}</p>
        </div>
        <button className='addToCartBttn' onClick={() => addToCart(id)}>
          Add To Cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
        </button>
    </div>
  )
}

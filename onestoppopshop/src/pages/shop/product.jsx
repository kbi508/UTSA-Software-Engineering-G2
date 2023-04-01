import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './product.module.css'

export const Product = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  const { addToCart, cartItems } = useContext(ShopContext)

  const cartItemsAmount = cartItems[id]
  return (
    <div className={styles.product}>
        <img src={productImage} alt='Product'/>
        <div className={styles.prodDesc}>
            <p><b>{productName}</b></p>
            <p>${price.toFixed(2)}</p>
        </div>
        <button className={styles.addToCartBttn} onClick={() => addToCart(id)}>
          Add To Cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
        </button>
    </div>
  )
}

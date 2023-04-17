import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './product.module.css'

export const Product = (props) => {
  const {name, price, product_Image, prod_description, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, hastags} = props.data
  const { addToCart, cartItems } = useContext(ShopContext)

  const cartItemsAmount = cartItems[props.prodnum]
  return (
    <div className={styles.product}>
        <img src={product_Image} alt='Product'/>
        <div className={styles.prodDesc}>
            <p><b>{name}</b></p>
            <p>${price.toFixed(2)}</p>
        </div>
        <button className={styles.addToCartBttn} onClick={() => addToCart(props.prodNum)}>
          Add To Cart {cartItemsAmount > 0 && <>({cartItemsAmount})</>}
        </button>
    </div>
  )
}

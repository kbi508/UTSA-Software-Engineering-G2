import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './product.module.css'

export const Product = (props) => {
  const {name, price, product_Image, prod_description, hastags, quantity} = props.data
  const { addToCart, cartItems } = useContext(ShopContext)

  return (
    <div className={styles.product} >
        <img src={product_Image}  onClick={() => props.productScreen(props.prodNum)} alt='Product'/>
        <div className={styles.prodDesc}>
            <p><b>{name}</b></p>
            <p>${price.toFixed(2)}</p>
        </div>
        
        <button className={styles.addToCartBttn} onClick={() => addToCart(props.prodNum)} disabled={quantity === 0}>
          {/* Add To Cart {cartItems[props.prodNum] > 0 && <>({cartItems[props.prodNum]})</>} {quantity === 0 ? '(Out of Stock)' : ''} */}
          {quantity === 0 ? 'Out of Stock' : `Add To Cart ${cartItems[props.prodNum] > 0 ? `(${cartItems[props.prodNum]})` : ('')}`}
        </button>
    </div>
  )
}

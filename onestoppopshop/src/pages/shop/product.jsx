import React, { useContext } from 'react'
import {ShopContext} from '../../context/shop-context'
import styles from './product.module.css'

export const Product = (props) => {
  const {name, price, product_Image, prod_description, hastags, quantity, salepercent, onsale} = props.data
  const { addToCart, cartItems } = useContext(ShopContext)

  return (
    <div className={styles.product} >
        {onsale && <p className={styles.sale}>Sale!</p>}
        <img src={product_Image}  onClick={() => props.productScreen(props.prodNum)} alt='Product'/>
        <div className={styles.prodDesc}>
            <p><b>{name}</b></p>
            {quantity > 0 && <p>{quantity} On Hand</p>}
            <p>${onsale ? (price * (1-(salepercent))).toFixed(2) : price} {onsale && '(' + salepercent*100 + '% off)'}</p>
        </div>        
        <button className={styles.addToCartBttn} onClick={() => addToCart(props.prodNum)} disabled={quantity === 0}>
          {quantity === 0 ? 'Out of Stock' : `Add To Cart ${cartItems[props.prodNum] > 0 ? `(${cartItems[props.prodNum]})` : ('')}`}
        </button>
    </div>
  )
}

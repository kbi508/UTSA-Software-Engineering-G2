import React, { useEffect, useContext } from 'react'
import {PRODUCTS} from '../../products'
import { Product } from './product'
import { Cart } from '../../components/cart'
import { ShopContext } from '../../context/shop-context'
import styles from './shop.module.css'

export const Shop = () => {

  return (
    <div className={styles.shop}>
      <div className={styles.shopContent}>
        <div className={styles.shopTitle}>
          <h1>Welcome to the PopShop!</h1>
        </div>
        <div className={styles.products}>
          {/* Need tp change into using back-end once setup.*/}
          {PRODUCTS.map((product) => (<Product data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

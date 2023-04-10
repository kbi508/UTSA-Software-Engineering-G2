import React from 'react'
import {PRODUCTS} from '../../products'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'


export const Shop = () => {

  return (
    <div className={styles.shop}>
      <div className={styles.shopContent}>
        <div className={styles.shopTitle}>
          <h1>Welcome to the PopShop!</h1>
        </div>
        <div className={styles.products}>
          {/* Need to change into using back-end once setup.*/}
          {PRODUCTS.map((product) => (<Product key = {product.id} data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

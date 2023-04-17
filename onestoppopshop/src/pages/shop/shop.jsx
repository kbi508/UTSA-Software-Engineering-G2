import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const { products, fetchProducts } = useContext(ShopContext)

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className={styles.shop}>
      <div className={styles.shopContent}>
        <div className={styles.products}>
          {products.map((product, index) => (<Product key={index} prodNum={index} data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

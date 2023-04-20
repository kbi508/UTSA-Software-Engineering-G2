import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const { products, fetchProducts } = useContext(ShopContext)
  const [searchString, setSearchString] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const searchProducts = (e) => {
    setSearchString(e.target.value)
  }

  return (
    <div className={styles.shop}>
      <div className={styles.searchsort}>
        <input className={styles.search} type='text' placeholder='Search' value={searchString} onChange={(e) => searchProducts(e)} />
      </div>
      <div className={styles.shopContent}>
        <div className={styles.products}>
          {products.map((product, index) => (<Product key={index} prodNum={index} data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

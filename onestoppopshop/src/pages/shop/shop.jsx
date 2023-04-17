import React, { useEffect, useState } from 'react'
import { ref, get } from 'firebase/database'
import { database } from '../../firebase'
// import {PRODUCTS} from '../../products'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'


export const Shop = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const productsRef = ref(database, 'products')
      get(productsRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          console.log('Products:')
          console.log(data)
          setProducts(data)
        }
        else {
          setProducts([])
        }
      })
    }
    catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <div className={styles.shop}>
      <div className={styles.shopContent}>
        <div className={styles.products}>
          {/* Need to change into using back-end once setup.*/}
          {/* {PRODUCTS.map((product) => (<Product key = {product.id} data={product}/>))} */}
          {products.map((product, index) => (<Product key={index} prodNum={index} data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

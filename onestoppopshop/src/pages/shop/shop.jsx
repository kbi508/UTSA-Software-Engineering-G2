import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const { products, fetchProducts } = useContext(ShopContext)
  const [searchString, setSearchString] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    fetchProducts()
    
  }, [])

  useEffect(() => {
    setFilteredProducts(products)
  }, [products])

  // When the search string is updated:
  useEffect(() => {
    if (searchString)
      setFilteredProducts(products.filter((product) => 
        product.prod_description.toUpperCase().search(searchString.toUpperCase()) !== -1 ||
        product.name.toUpperCase().search(searchString.toUpperCase()) !== -1  ||
        product.hastags.some((tag) => (tag.toUpperCase().search(searchString.toUpperCase()) !== -1))
      ))
    else
      setFilteredProducts(products) // If the string was removed, show all products now.
  }, [searchString])


  return (
    <div className={styles.shop}>
      <div className={styles.searchsort}>
        <input className={styles.search} type='text' placeholder='Search' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
      </div>
      <div className={styles.shopContent}>
        <div className={styles.products}>
          {filteredProducts.map((product, index) => (<Product key={index} prodNum={index} data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

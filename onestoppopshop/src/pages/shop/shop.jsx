import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const { products, fetchProducts } = useContext(ShopContext)
  const [searchString, setSearchString] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productSort, setProductSort] = useState(null)
  const [ascending, setAscending] = useState(false)


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

  useEffect(() => {
    if (productSort === 'price') {
      let sortedProducts = null
      if (ascending) 
          sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
      else
          sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price)

      setFilteredProducts(sortedProducts)
    }
    else if (productSort === 'quantity') {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
          if (ascending)
            return a.quantity - b.quantity
          else
            return b.quantity - a.quantity
        })
        console.log(sortedProducts)
        setFilteredProducts(sortedProducts)
    }
  }, [productSort, ascending])


  return (
    <div className={styles.shop}>
      <div className={styles.searchsort}>
        <div style={{whiteSpace: 'nowrap'}}>
          <input className={styles.search} type='text' placeholder='Search' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <select className={styles.sort} onChange={(e) => setProductSort(e.target.value)}>
              <option value={null}></option>
              <option value={'quantity'}>Availability</option>
              <option value={'price'}>Price</option>
          </select>
          <button className={styles.ascendBttn} onClick={() => setAscending(!ascending)}>{ascending ? 'Low...High' : 'High...Low'}</button>
        </div>
      </div>
      <div className={styles.shopContent}>
      {filteredProducts.length === 0 ? (<p className={styles.loading}>Loading...</p>) : 
        (<><div className={styles.products}>
          {filteredProducts.map((product, index) => (<Product key={index} prodNum={index} data={product}/>))}
        </div></>)
      }
      </div>
      <Cart />
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'


export const Shop = () => {
  const { products, fetchProducts, setProducts } = useContext(ShopContext)
  const [searchString, setSearchString] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productSort, setProductSort] = useState(null)
  const [ascending, setAscending] = useState(false)
  const [saleFilter, setSaleFilter] = useState(false)
  const [emptyMessage, setEmptyMessage] = useState(false) // Display no content found message?


  useEffect(() => {
    fetchProducts()
  }, [])
  
  useEffect(() => {
    // console.log(JSON.parse(JSON.stringify(products)))
    setFilteredProducts([...products])
  }, [products])

  // When the search string is updated:
  useEffect(() => {
    if (searchString) {
      setFilteredProducts(filteredProducts.filter((product) => (product) && (product.prod_description.toUpperCase().search(searchString.toUpperCase()) !== -1 ||
        product.name.toUpperCase().search(searchString.toUpperCase()) !== -1  ||
        product.hastags.some((tag) => (tag.toUpperCase().search(searchString.toUpperCase()) !== -1)))))
      setEmptyMessage(true)
    }
    else {
      setEmptyMessage(false)
      setFilteredProducts([...products]) // If the string was removed, show all products now.
    }
  }, [searchString])


  const sortProducts = () => {
    if (productSort === 'price') {
      if (ascending) 
        setProducts([...products].sort((a, b) => a.price - b.price))
      else
        setProducts([...products].sort((a, b) => b.price - a.price))
    }
    else if (productSort === 'quantity') {
      setProducts([...products].sort((a, b) => {
          if (ascending)
            return a.quantity - b.quantity
          else
            return b.quantity - a.quantity
        }))
    }
    else {
      fetchProducts()
    }
  }

  useEffect(() => {
    sortProducts()
  }, [productSort, ascending])


  return (
    <div className={styles.shop}>
      <div className={styles.searchsort}>
        <div style={{whiteSpace: 'nowrap', display: 'flex', alignItems: 'baseline'}}>
          <button className={!saleFilter ? styles.saleBttn : `${styles.saleBttn} ${styles.saleBttnActv}`} onClick={() => setSaleFilter(!saleFilter)}>{saleFilter ? 'On Sale' : 'On Sale?'}</button>
          <input className={styles.search} type='text' placeholder='Search' value={searchString} onChange={(e) => setSearchString(e.target.value)} />
          <select id='sort' className={(productSort === 'price' || productSort === 'quantity') ? styles.sort : `${styles.sort} ${styles.noAscending}`} onChange={(e) => setProductSort(e.target.value)}>
              <option value={null}>Sort by</option>
              <option value={'quantity'}>Availability</option>
              <option value={'price'}>Price</option>
          </select>
          {(productSort === 'price' || productSort === 'quantity') &&
          <button className={styles.ascendBttn} onClick={() => setAscending(!ascending)}>{ascending ? 'Low...High' : 'High...Low'}</button>
          }
          </div>
      </div>
      <div className={styles.shopContent}>
      {filteredProducts.length === 0 ? 
        (<div className={styles.loading}>{!emptyMessage ? ('Loading...') : ('No Items Found')}</div>) 
      : 
        (<>
        <div className={styles.products}>
          {products.map((product) => {
            if (product)
            {
              let showThisProd = true
              if (searchString) {
                if ((product.prod_description.toUpperCase().search(searchString.toUpperCase()) !== -1 ||
                                      product.name.toUpperCase().search(searchString.toUpperCase()) !== -1  ||
                                      product.hastags.some((tag) => (tag.toUpperCase().search(searchString.toUpperCase()) !== -1)))) {
                  showThisProd = true
                }
                else 
                  showThisProd = false
              }
              if (saleFilter) {
                if (!(product.onsale) || !(showThisProd))
                  showThisProd = false
              }
              
              if (showThisProd)
                return (<Product key={product.prodNum} prodNum={product.prodNum} data={product}/>)
              else
                return <></>
            }
            else 
              return <></>
          })}
        </div>
        </>)
      }
      </div>
      <Cart />
    </div>
  )
}

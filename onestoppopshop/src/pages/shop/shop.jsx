import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'
import { ShopProductSplash } from './shopProductSplash'


export const Shop = () => {
  const { products, fetchProducts, setProducts, setIsOpen } = useContext(ShopContext)
  const [searchString, setSearchString] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const [productSort, setProductSort] = useState(null)
  const [ascending, setAscending] = useState(false)
  const [saleFilter, setSaleFilter] = useState(false)
  const [emptyMessage, setEmptyMessage] = useState(false) // Display no content found message?

  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [weightUnit, setWeightUnit] = useState('')
  const [weight, setWeight] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sale, setSale] = useState(false)
  const [discount, setDiscount] = useState('')
  const [tags, setTags] = useState([])
  const [curProdNum, setCurProdNum] = useState(null)
  const [showProductSplash, setShowProductSplash] = useState(false)
  const productVals = {desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags, curProdNum, setTags, setSale, setDiscount, setDesc, setPrice, setName, setImg,setWeightUnit, setWeight, setQuantity}


  useEffect(() => {
    fetchProducts()
    setIsOpen(false)
  }, [])
  
  useEffect(() => {
    // console.log(JSON.parse(JSON.stringify(products)))
    setFilteredProducts([...products])
  }, [products])

  // When the search string is updated:
  useEffect(() => {
    if (searchString) {
      setFilteredProducts(products.filter((product) => (product) && (product.prod_description.toUpperCase().search(searchString.toUpperCase()) !== -1 ||
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


  useEffect(() => {
    if (!showProductSplash)
    {
        setDesc('')
        setPrice('')
        setName('')
        setImg('')
        setWeightUnit('')
        setWeight('')
        setQuantity('')
        setSale(false)
        setDiscount('')
        setTags([])
        setCurProdNum(null)
    }
  }, [showProductSplash])

  const productScreen = (productNum) => {
    let curProduct = products.find((product) => product?.prodNum === productNum)
    setDesc(curProduct.prod_description)
    setPrice(curProduct.price)
    setName(curProduct.name)
    setImg(curProduct.product_Image)
    setWeightUnit(curProduct.weight_Type)
    setWeight(curProduct.weight_Amount)
    setQuantity(curProduct.quantity)
    setSale(curProduct.onsale)
    setDiscount(Number(curProduct.salepercent * 100))
    setTags(curProduct.hastags)
    setCurProdNum(productNum)
    setShowProductSplash(true)
  }

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
                return (<Product key={product.prodNum} prodNum={product.prodNum} data={product} productScreen={productScreen}/>)
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
      {showProductSplash && <ShopProductSplash data={productVals} close={setShowProductSplash}/>}
    </div>
  )
}

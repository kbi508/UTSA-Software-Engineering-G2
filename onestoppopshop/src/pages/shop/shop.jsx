import React, { useContext, useEffect, useState } from 'react'
import { Product } from './product'
import { Cart } from '../../components/cart'
import styles from './shop.module.css'
import { ShopContext } from '../../context/shop-context'
import { ShopProductSplash } from './shopProductSplash'


export const Shop = () => {
  const { products, fetchProducts } = useContext(ShopContext)
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
  const productVals = {desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags, setTags, setSale, setDiscount, setDesc, setPrice, setName, setImg,setWeightUnit, setWeight, setQuantity}


  useEffect(() => {
    fetchProducts()
  }, [])

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

  const productScreen = (productNum=null) => {
    console.log("Attempting" + productNum)
    if (productNum) { // If this is an edit call, pass in the data:
        setDesc(products[productNum].prod_description)
        setPrice(products[productNum].price)
        setName(products[productNum].name)
        setImg(products[productNum].product_Image)
        setWeightUnit(products[productNum].weight_Type)
        setWeight(products[productNum].weight_Amount)
        setQuantity(products[productNum].quantity)
        setSale(products[productNum].onsale)
        setDiscount(Number(products[productNum].salepercent * 100))
        setTags(products[productNum].hastags)
        setCurProdNum(productNum)
        setShowProductSplash(true)
    }
  }

  return (
    <div className={styles.shop}>
      <div className={styles.shopContent}>
        <div className={styles.products}>
          {products.map((product, index) => (<Product key={index} prodNum={index} data={product} productScreen={productScreen}/>))}
        </div>
      </div>
      <Cart />
      {showProductSplash && <ShopProductSplash data={productVals} close={setShowProductSplash}/>}
    </div>
  )
}

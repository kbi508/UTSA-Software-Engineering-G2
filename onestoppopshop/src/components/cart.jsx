import React, { useContext, useRef, useEffect, useState } from 'react'
import { CartItem } from './cartItem'
import {ShopContext} from '../context/shop-context'
import styles from './cart.module.css'
import { Link } from 'react-router-dom'

export const Cart = () => {
  const { products, cartItems, numCartItems, getTotalCartAmount, toggleOpen, resetCart, isOpen} = useContext(ShopContext)
  const totalAmount = getTotalCartAmount().toFixed(2)
  const cart = useRef(null)

  // Makes a deep copy of products and then sort it by product number.
  const [unsortedProducts, setUnsortedProducts] = useState([...products])  
  useEffect(() => {
    setUnsortedProducts(JSON.parse(JSON.stringify(products)).sort((a, b) => {
      if (a && b)
        return a.prodNum < b.prodNum
      else 
        return 0
    }))
  }, [])

  if (cart.current)
  {
    const navbar = document.getElementById('navbar')
    cart.current.style.top = (navbar.offsetHeight) + 'px'
    // cart.current.style.height = 'calc(100vh - ' + navbar.offsetHeight + ')'
  }

  return (
    <div ref={cart} className={isOpen ? (`${styles.cart} ${styles.active}`) : (styles.cart)}>
        <div className={styles.xBttn} onClick={toggleOpen}>X</div>

        <div className={styles.cartItems}>
            {unsortedProducts.map((product) => {
                if (product && cartItems[product.prodNum] > 0)
                  return <CartItem key={product.prodNum} prodNum={product.prodNum} data={product}/>
                return <></>
            })}
        </div>

        <div className={styles.checkout}>
            <p>Subtotal: ${Number(totalAmount).toFixed(2)}</p>
            <button className={`${styles.checkoutBttn} ${styles.cartBttn}`} disabled={numCartItems === 0 ? true : false}>
              {numCartItems === 0 ? 'Checkout' : (<Link className={styles.checkoutLink} to='/checkout'> Checkout </Link>)}
            </button>
            <button className={`${styles.clearBttn} ${styles.cartBttn}`} onClick={resetCart}> Clear Cart </button>
        </div>
    </div>
  )
}

import React, { useEffect, useContext } from 'react'
import {PRODUCTS} from '../../products'
import { Product } from './product'
import { Cart } from '../../components/cart'
import { ShopContext } from '../../context/shop-context'
import './shop.css'

export const Shop = () => {
  const { isOpen } = useContext(ShopContext)

  useEffect(() => {
    const cart = document.querySelector('.cart')
    const shop = document.querySelector('.shop-content')

    cart.classList.toggle('active')

    /*if (cart.classList.contains('active'))
    {
      shop.style.flexBasis = '70%'
    }
    else
      shop.style.flexBasis = '100%'*/

  }, [isOpen])

  return (
    <div className='shop'>
      <div className='shop-content'>
        <div className='shopTitle'>
          <h1>Welcome to the PopShop!</h1>
        </div>
        <div className='products'>
          {/* Need tp change into using back-end once setup.*/}
          {PRODUCTS.map((product) => (<Product data={product}/>))}
        </div>
      </div>
      <Cart />
    </div>
  )
}

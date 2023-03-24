import React from 'react'
import {PRODUCTS} from '../../products'
import { Product } from './product'
import './shop.css'

export const Shop = () => {
  return (
    <div className='shop'>
      <div className='shopTitle'>
        <h1>Welcome to the PopShop!</h1>
      </div>
      <div className='products'>
        {/* Need tp change into using back-end once setup.*/}
        {PRODUCTS.map((product) => (<Product data={product}/>))}
      </div>
    </div>
  )
}

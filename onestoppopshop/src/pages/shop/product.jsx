import React from 'react'

export const Product = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data
  return (
    <div className='product'>
        <img src={productImage} alt='Product'/>
        <div className='prod-desc'>
            <p><b>{productName}</b></p>
            <p>${price}</p>
        </div>
        <button className='addToCartBttn'>Add To Cart</button>
    </div>
  )
}

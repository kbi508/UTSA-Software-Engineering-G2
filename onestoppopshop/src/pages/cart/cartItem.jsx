import React from 'react'

export const CartItem = (props) => {
  const {id, productName, price, productImage, descript, star1Rate, star2Rate, star3Rate, star4Rate, star5Rate, tags} = props.data

  return (
    <div className='cart-item'>
        <img src={productImage}/>
        <div className='descript'>
            <p><b>{productName}</b></p>
            <p>$ {price}</p>
        </div>
    </div>
  )
}

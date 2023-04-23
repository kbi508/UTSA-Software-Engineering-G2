import React, { useState } from 'react'
import styles from './shopProductSplash.module.css'
import { Tag } from './tag'
export const ShopProductSplash = (props) => {
const { desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags} = props.data

return (
    <div className={styles.backdrop}>
        <div className={styles.productSplash}>
            <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
            <img src={img} alt='Product'/>
            <p className={styles.prodName}>{name}</p>
            <div className={styles.prodDesc}>
                <div><p>{desc}</p></div>
                <div><p>${sale ? (price * (1-(discount/100))).toFixed(2) : price} {sale && '(' + discount + '% off)'}</p></div>
                <div>{quantity === 0 ? (<p>Out of Stock</p>) : ('')}</div>
            </div>
            <div className={styles.tags}>
                {tags.map((tag) => <Tag text={tag} />)}
            </div>
        </div>
    </div>
    )    
}
import React, { useState } from 'react'
import styles from './shopProductSplash.module.css'
import { Tag } from './tag'
export const ShopProductSplash = (props) => {
const { desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags} = props.data

return (
    <div className={styles.backdrop}>
        <div className={styles.productSplash}>
            <div className={styles.splashHeader}>
                <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
                <img src={img} alt='Product'/>
                <div className={styles.prodDesc}>
                    <div className={styles.prodName}>
                        <p>{name}</p>
                    </div>
                    <div><p>{desc}</p></div>
                    <div><p>Price: ${price}</p></div>                  
                    <div><p>{sale}</p></div>
                    <div> <p>{discount}</p></div>
                    <div className={styles.tags}>
                    {tags.map((tag) => <Tag text={tag} />)}
                    </div>

                </div>

            </div>

        </div>
    </div>    

    
    
)    
}
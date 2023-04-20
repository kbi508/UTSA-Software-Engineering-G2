import React, { useState } from 'react'
import styles from './shopProductSplash.module.css'
//import { Tag } from './tag'
export const shopProductSplash = (props) => {
    const { desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags} = props.data

    return (
        <div className={styles.backdrop}>
            <div className={styles.productSplash}>
                <div className={styles.splashHeader}>
                    <p>{name}</p>
                    <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
                    <img src={img} alt='Product'/>
                    <div className={styles.prodDesc}>
                        <p>{price}</p>
                        <p>{desc}</p>
                        <p>{weight}</p>
                        <p>{weightUnit}</p>
                        <p>{sale}</p>
                        <p>{discount}</p>
                        <div className={styles.tags}>
                            {tags.map(tag)}
                        </div>

                    </div>

                </div>

            </div>
        </div>    
        
    )    
}
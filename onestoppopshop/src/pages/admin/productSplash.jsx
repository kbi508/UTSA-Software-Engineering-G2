import React, { useState } from 'react'
import styles from './productSplash.module.css'

export const ProductSplash = (props) => {
  const { desc, price, name, img, weightUnit, weight, setDesc, setPrice, setName, setImg, setWeightUnit, setWeight } = props.data
  
  return (
    <div className={styles.backdrop}>
        <div className={styles.productSplash}>
          <div className={styles.splashHeader}>
            <p>Product Info</p>
            <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
          </div>
          <div className={styles.inputs}>
            <input className={styles.desc} type='text' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input className={styles.name} type='text' placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input className={styles.img} type='text' placeholder='Image URL' value={img} onChange={(e) => setImg(e.target.value)} />
            <input className={styles.price} type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            <input className={styles.weightUnit} type='text' placeholder='Weight Unit (I.E. oz)' value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} />
            <input className={styles.weight} type='number' placeholder='Weight Amount' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button className={styles.lightBttn} id={styles.submit} onClick={() => props.add()}>Submit</button>
            {props.error && <p>All fields are Required!</p>}
          </div>
        </div>
    </div>
  )
}

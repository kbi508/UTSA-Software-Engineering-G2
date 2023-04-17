import React, { useState } from 'react'
import styles from './productSplash.module.css'

export const ProductSplash = (props) => {
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [weightUnit, setWeightUnit] = useState('')
  const [weight, setWeight] = useState('')
  
  return (
    <div className={styles.backdrop}>
        <div className={styles.productSplash}>
            <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
            <input type='text' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
            <input type='text' placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' placeholder='Image URL' value={img} onChange={(e) => setImg(e.target.value)} />
            <input type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
            <input type='text' placeholder='Weight Unit (I.E. oz)' value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} />
            <input type='number' placeholder='Weight Amount' value={weight} onChange={(e) => setWeight(e.target.value)} />
            <button className={styles.lightBttn} id={styles.submit}>Submit</button>
        </div>
    </div>
  )
}

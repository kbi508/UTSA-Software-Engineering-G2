import React, { useState } from 'react'
import styles from './productSplash.module.css'
import { Tag } from './tag'

export const ProductSplash = (props) => {
  const { desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags, setTags, setDesc, setPrice, setName, setImg, setWeightUnit, setWeight, setQuantity, setSale, setDiscount} = props.data
  const [enteredTag, setEnteredTag] = useState('')

  const addTag = () => {
    if (enteredTag) {
      setTags((prev) => [...prev, enteredTag])
      setEnteredTag('')
    }
  }

  const removeTag = (text) => {
    setTags(tags.filter((tag) => tag !== text))
  }

  return (
    <div className={styles.backdrop}>
      <div className={styles.productSplash}>
        <div className={styles.splashHeader}>
          <p>Product Info</p>
          <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
        </div>
        <div className={styles.inputs}>
          <input className={styles.name} type='text' placeholder='Product Name' value={name} onChange={(e) => setName(e.target.value)} />
          <input className={styles.desc} type='text' placeholder='Description' value={desc} onChange={(e) => setDesc(e.target.value)} />
          <input className={styles.img} type='text' placeholder='Image URL' value={img} onChange={(e) => setImg(e.target.value)} />
          <input className={styles.price} type='number' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} />
          <input className={styles.weightUnit} type='text' placeholder='Weight Unit (I.E. oz)' value={weightUnit} onChange={(e) => setWeightUnit(e.target.value)} />
          <input className={styles.weight} type='number' placeholder='Weight Amount' value={weight} onChange={(e) => setWeight(e.target.value)} />
          <input className={styles.quantity} type='number' placeholder='Quantity' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <div className={styles.saleHolder}>
            <p id={styles.saleText}>On Sale?</p>
            <input className={styles.sale} type='checkbox' checked={sale} onChange={(e) => setSale(e.target.checked)} />
          </div>
          {sale && <input className={styles.discount} type='number' placeholder='Discount %' value={discount} onChange={(e) => setDiscount(e.target.value)} />}
          <div id={styles.tagsTitle}>
            <p>Tags</p>
            <input className={styles.enteredTag} type='text' placeholder='Enter new Tag' value={enteredTag} onChange={(e) => setEnteredTag(e.target.value)} />
            <button className={`${styles.addTag}`} onClick={() => addTag()}><p>+</p></button>
          </div>
          <div className={styles.tags}>
            {tags.map((tag) => <Tag text={tag} removeTag={removeTag}/>)}
          </div>
          <button className={styles.lightBttn} id={styles.submit} onClick={() => props.add()}>Submit</button>
          <button className={desc ? (styles.lightBttn) : (`${styles.lightBttn} ${styles.disabled}`)} disabled={!desc ? true : false} id={styles.delete} onClick={() => props.delete()}>Delete</button>
          {props.error && <p>All fields are Required!</p>}
        </div>
      </div>
    </div>
  )
}

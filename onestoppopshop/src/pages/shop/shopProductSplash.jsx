import React, { useContext } from 'react'
import styles from './shopProductSplash.module.css'
import { Tag } from './tag'
import { ShopContext } from '../../context/shop-context'

export const ShopProductSplash = (props) => {
    const { desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags, curProdNum } = props.data
    const {removeFromCart, updateCartItemCount, addToCart, cartItems } = useContext(ShopContext)

    return (
        <div className={styles.backdrop}>
            <div className={styles.productSplash}>
                <button className={styles.lightBttn} onClick={() => props.close()}>X</button>
                <img src={img} alt='Product'/>
                <p className={styles.prodName}>{name}</p>
                <div className={styles.prodDesc}>
                    <div><p>{desc}</p></div>
                    <div><p>${sale ? (price * (1-(discount/100))).toFixed(2) : price.toFixed(2)} {sale && '(' + discount + '% off)'}</p></div>
                    <p>Weight: {weight} {weightUnit}</p>
                    <div>
                    {quantity === 0 ? (<p>Out of Stock</p>) : (
                        <div className={styles.countHandler}>
                            <button onClick={() => removeFromCart(curProdNum)}>-</button>
                            <input value={cartItems[curProdNum] ? (cartItems[curProdNum]) : (0)} onChange={(e) => updateCartItemCount(Number(e.target.value), curProdNum)} />
                            <button onClick={() => addToCart(curProdNum)}>+</button>
                        </div>
                    )}
                    </div>
                    {quantity > 0 && <p>{quantity} On Hand</p>}
                </div>
                <div className={styles.tags}>
                    {tags.map((tag) => <Tag text={tag} />)}
                </div>
            </div>
        </div>
    )    
}
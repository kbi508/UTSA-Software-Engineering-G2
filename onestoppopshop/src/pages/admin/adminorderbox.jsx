import React, { useContext } from 'react'
import styles from './adminorderbox.module.css'
import { ShopContext } from '../../context/shop-context'

export const Adminorderbox = (props) => {
  const { products } = useContext(ShopContext)

  return (
    <div className={styles.box}>
        <p id={styles.orderNum}>{props.data.key}</p>
        <p id={styles.total}>${Number(props.data.amount).toFixed(2)}</p>
        <p id={styles.date}>{props.data.date}</p>
        <div className={styles.items}>
        {Object.keys(props.data.items).map((prodNum) => {
            if (prodNum) {
              const product = products.find((product) => product?.prodNum === Number(prodNum))
              return (
              <><span>{product.name}</span> <span className={styles.price}>${Number(props.data.items[prodNum].price).toFixed(2)} x {props.data.items[prodNum].numBought} = ${Number(props.data.items[prodNum].price*props.data.items[prodNum].numBought).toFixed(2)}</span></>
              )
            }
            return <></>
        })}
        </div>
        <p>{props.data.add} {props.data.city}, {props.data.state} {props.data.zip} {props.data.country}</p>
        <p id={styles.delivery}>{props.data.active ? 'Est. Delivery' : 'Delivered'}: {props.data.deliveryDate}</p>
    </div>
  )
}

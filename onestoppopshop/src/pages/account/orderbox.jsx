import React, { useState, useEffect, useContext } from 'react'
import { ref, get } from 'firebase/database'
import styles from './orderbox.module.css'
import { ShopContext } from '../../context/shop-context'
import { database } from '../../firebase'

export const Orderbox = (props) => {
  const [orderItems, setOrderItems] = useState(null)
  const { } = useContext(ShopContext)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsRef = ref(database, 'products')
        const snapshot = await get(itemsRef)
        if (snapshot.exists()) {
          // Get the list of all products:
          const data = snapshot.val()
          const productNumbers = Object.keys(data)
          const totalProducts = Object.values(data)
          totalProducts.forEach((product, index) => { // Put the product number in each product object.
            product.key = productNumbers[index]
          })
          // Filter items that are in this order:
          const itemsInOrder = totalProducts.filter((product) => product.numBought = props.data.items[product.key])
          console.log("Total items in this order:")
          console.log(itemsInOrder)
          // Add the number of items as a value to each:
          setOrderItems(itemsInOrder)
        } else {
          console.log("Snapshot failure...")
          return [] // Return an empty array if snapshot does not exist
        }
      } catch (error) {
        console.log(error)
        return [] // Return an empty array in case of an error
      }
    }

    fetchItems()
  }, [])

  return (
    <div className={styles.orderBox}>
        <p className={styles.orderNum}>Order # {props.data.key}</p>
        {props.data.active ? 
        (
          <p className={styles.delivery}>Est. Delivery on {props.data.deliveryDate} </p>
        )
        :
        (
          <p className={`${styles.delivery} ${styles.delivered}`}>Delivered on {props.data.deliveryDate}</p>
        )}
        <div>
          <p className={styles.date}><b>Date:</b> {props.data.date}</p>
          <p className={styles.total}><b>Total:</b> ${Number(props.data.amount).toFixed(2)}</p>
        </div>
        <div className={styles.add}>
          <p className={styles.shipTo}><b>Ship to:</b></p>
          <div>
              <p>{props.data.add}</p>
              <p>{props.data.city}, {props.data.state}</p>
              <p>{props.data.country}, {props.data.zip}</p>
          </div>
        </div>
        <div className={styles.items}>
            {orderItems && orderItems.map((item) => {
              return (
                <><span>{item.name} ${Number(item.price).toFixed(2)}</span> <span className={styles.price}>x {item.numBought} = {Number(item.price*item.numBought).toFixed(2)}</span></>
              )
            })}
        </div>
    </div>
  )
}

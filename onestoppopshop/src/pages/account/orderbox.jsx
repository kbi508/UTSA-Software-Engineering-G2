import React, { useEffect, useContext } from 'react'
import { ref, get } from 'firebase/database'
import styles from './orderbox.module.css'
import { ShopContext } from '../../context/shop-context'
import { database } from '../../firebase'

export const Orderbox = (props) => {
  const { products } = useContext(ShopContext)
  // const [orderItems, setOrderItems] = useState(null)

  useEffect(() => {
    // ONE TIME - CORRECT OLD ORDERS:
    // const ordersRef = ref(database, 'orders')
    // get(ordersRef)
    // .then ((snapshot) => {
    //   if (snapshot.exists()){
    //     const data = snapshot.val()
    //     Object.keys(data).forEach((orderNum) => {
    //       Object.keys(data[orderNum].items).forEach((itemNum) => {
    //         let newItems = {
    //           numBought: 0,
    //           price: 0
    //         }
    //         const product = products.find((product) => product?.prodNum === Number(itemNum))
    //         newItems.numBought = data[orderNum].items[itemNum]
    //         newItems.price = Number(product?.price)
    //         data[orderNum].items[itemNum] = newItems
    //       })
    //     })
    //     update(ordersRef, data)
    //   }
    // })


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
          // const itemsInOrder = totalProducts.filter((product) => Object.keys(props.data.items).some((itemNum) => Number(itemNum) === Number(product?.prodNum)))
          // console.log("Total items in this order:")
          // console.log(itemsInOrder)
          // Add the number of items as a value to each:
          // setOrderItems(itemsInOrder)
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

  // useEffect(() => console.log(orderItems), [orderItems])

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
            {Object.keys(props.data.items).map((itemNum) => {
              if (itemNum) {
                console.log('Creating item for ' + itemNum)
                const product = products.find((product) => product?.prodNum === Number(itemNum))
                return (
                  <><span>{product.name}</span> <span className={styles.price}>${Number(props.data.items[itemNum].price).toFixed(2)} x {props.data.items[itemNum].numBought} = ${Number(props.data.items[itemNum].price*props.data.items[itemNum].numBought).toFixed(2)}</span></>
                )
              }
            })}
        </div>
    </div>
  )
}

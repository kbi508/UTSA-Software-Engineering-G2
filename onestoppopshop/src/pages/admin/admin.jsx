import React, { useContext, useEffect, useState } from 'react'
import styles from './admin.module.css'
import { get, ref, set } from 'firebase/database'
import { database } from '../../firebase'
import { PRODUCTS } from '../../products'
import { Orderbox } from '../account/orderbox'
import { Userbox } from './userbox'
import { Codebox } from './codebox'
import { ShopContext } from '../../context/shop-context'

export const Admin = () => {
  const [users, setUsers] = useState({})
  const [orders, setOrders] = useState([])
  const [codes, setCodes] = useState({})
  const [selected, setSelected] = useState(null)
  const [activeOnly, setActiveOnly] = useState(false)
  const { authIsAdmin } = useContext(ShopContext)

  // For new codes:
  const [codeText, setCodeText] = useState('')
  const [codeNum, setCodeNum] = useState(null)

  const selectUser = (selUid) => {
    if (selUid === selected)
        setSelected(null)
    else
        setSelected(selUid)
  }

  const addCode = () => {
    const codeRef = ref(database, 'codes/' + codeText.toUpperCase())
    set(codeRef, {
        discount: (codeNum/100)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const ordersRef = ref(database, 'orders')
            const snapshot = await get(ordersRef)
            if (snapshot.exists()) {
                const data = snapshot.val()
                const orderNumbers = Object.keys(data)
                const finalOrders = Object.values(data)
                finalOrders.forEach((order, index) => {
                    order.key = orderNumbers[index]
                })
                // Remove empty items in finalOrders (possibly weird firebase thing)
                // Firebase makes the items into a list/array rather than a JSON object, this converts it back:
                // Note that this only happens for SOME items, some are read as JSONs as intended, and thus don't need conversion.
                finalOrders.forEach((order => {
                if (Array.isArray(order.items))
                {
                    const newItems = {}
                    order.items.forEach((item, index) => {
                        if (item) {
                        newItems[index] = item
                        }
                    })
                    order.items = newItems
                }
                }))
                setOrders(finalOrders)
            } else {
            return [] // Return an empty array if snapshot does not exist
            }
        } catch (error) {
            console.log(error)
            return [] // Return an empty array in case of an error
        }
    }

    const fetchUsers = async () => {
        try {
            const userRef = ref(database, 'users')
            get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    // Add selected to users:
                    const data = snapshot.val()
                    setUsers(data)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const fetchCodes = async () => {
        try {
            const codeRef = ref(database, 'codes')
            get(codeRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val()
                    setCodes(data)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }
    fetchUsers()
    fetchOrders()
    fetchCodes()
  }, [])

  return (
    <div className={styles.adminPage}>
        {!authIsAdmin ? 
        (<div>Unauthorized Account!</div>) 
        : 
        (<>
        <div>
        <div className={styles.topTitles}>
            <div className={styles.title}>Users</div>
            <div className={styles.title}>Orders</div>
        </div>
        <div className={styles.top}>
            <div className={styles.users}>
                <div className={styles.activeBttnBG}>
                    <button className={activeOnly ? (`${styles.lightBttn} ${styles.lightBttnClcked}`) : (styles.lightBttn)} onClick={() => setActiveOnly(!activeOnly)}>Active Only</button>
                </div>
                {Object.keys(users).map((uid) => {
                    return <Userbox key={uid} uid={uid} data={users[uid]} selected={selected} selectUser={selectUser}/>
                })}
            </div>

            <div className={styles.orders}>
                {orders.map((order) => {
                    if (activeOnly)
                    {
                        if (order.active)
                        {
                            if (selected !== null) {
                                if (order.email === selected)
                                    return <Orderbox key={order.key} data={order} />
                                else 
                                    return <></>
                            }
                            else
                                return <Orderbox key={order.key} data={order} />
                        }
                        else
                            return <></>
                    }
                    else
                    {
                        if (selected !== null) {
                            if (order.email === selected)
                                return <Orderbox key={order.key} data={order} />
                            else 
                                return <></>
                        }
                        else
                            return <Orderbox key={order.key} data={order} />
                    }
                })}
            </div>
        </div>
        </div>

        <div className={styles.discountCodes}>
            <div className={styles.codeHeader}>
                <div className={styles.title}>Discount Codes</div>
                <div className={styles.codeInputs}>
                    <input className={styles.addCodeText} type='text' placeholder='Enter Code Text' value={codeText} onChange={(e) => setCodeText(e.target.value)} />
                    <input className={styles.addCodeNum} type='number' min={1} max={100} placeholder='Enter Discount %' value={codeNum} onChange={(e) => setCodeNum(e.target.value)} />
                    <button className={styles.lightBttn} onClick={() => addCode()}>Add Code</button>
                </div>
            </div>
            <div className={styles.codes}>
                {Object.keys(codes).map((codeName) => {
                    return <Codebox key={codeName} codeName={codeName} data={codes[codeName]} />
                })}
            </div>
        </div>

        <div className={styles.items}>

        </div>

        </>)}
    </div>
  )
}

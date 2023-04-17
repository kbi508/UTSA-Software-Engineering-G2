import React, { useContext, useEffect, useState } from 'react'
import styles from './admin.module.css'
import { get, ref, set, remove, update } from 'firebase/database'
import { database } from '../../firebase'
import { Orderbox } from '../account/orderbox'
import { Userbox } from './userbox'
import { Codebox } from './codebox'
import { Productbox } from './productbox'
import { ShopContext } from '../../context/shop-context'
import { ProductSplash } from './productSplash'

export const Admin = () => {
  const [users, setUsers] = useState({})
  const [orders, setOrders] = useState([])
  const [codes, setCodes] = useState({})
  const [products, setProducts] = useState({})
  const [selected, setSelected] = useState(null)
  const [activeOnly, setActiveOnly] = useState(false)
  const { authIsAdmin } = useContext(ShopContext)

  // For product splash:
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')
  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [weightUnit, setWeightUnit] = useState('')
  const [weight, setWeight] = useState('')
  const [quantity, setQuantity] = useState('')
  const [sale, setSale] = useState(false)
  const [discount, setDiscount] = useState('')
  const [tags, setTags] = useState([])
  const productVals = {desc, price, name, img, weightUnit, weight, quantity, sale, discount, tags, setTags, setSale, setDiscount, setDesc, setPrice, setName, setImg,setWeightUnit, setWeight, setQuantity}
  const [showProductSplash, setShowProductSplash] = useState(false)
  const [showSplashError, setSplashError] = useState(false)
  
  const [curProdNum, setCurProdNum] = useState(null)

  // For new codes:
  const [codeText, setCodeText] = useState('')
  const [codeNum, setCodeNum] = useState(null)

  const selectUser = (selUid) => {
    if (selUid === selected)
        setSelected(null)
    else
        setSelected(selUid)
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
              else
              {
                setCodes({})
              }
          })
      }
      catch (error) {
          console.log(error)
      }
  }

  const fetchProducts = async () => {
    try {
        const productsRef = ref(database, 'products')
        get(productsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setProducts(data)
            }
            else {
                setProducts({})
            }
        })
    }
    catch (error) {
        console.log(error)
    }
  }

  const addCode = () => {
    const codeRef = ref(database, 'codes/' + codeText.toUpperCase())
    set(codeRef, {
        discount: Number(codeNum/100),
        numRedeemed: 0
    })
    .then(() => {
        fetchCodes()
        setCodeText('')
        setCodeNum('')
    })
    .catch((error) => console.log(error))
  }

  const removeProduct = () => {
    const productRef = ref(database, 'products/' + curProdNum)
    remove(productRef)
    .then((snapshot) => {
        fetchProducts()
        setShowProductSplash(false)
    })
    .catch((error) => console.log(error))
  }

  const deleteCode = (codeName) => {
    const codeRef = ref(database, 'codes/' + codeName.toUpperCase())
    remove(codeRef)
    .then(() => {
        fetchCodes()
    })
    .catch((error) => console.log(error))
  }

  // When a product is clicked:
  const productScreen = (productNum=null) => {
    if (productNum) { // If this is an edit call, pass in the data:
        setDesc(products[productNum].prod_description)
        setPrice(products[productNum].price)
        setName(products[productNum].name)
        setImg(products[productNum].product_Image)
        setWeightUnit(products[productNum].weight_Type)
        setWeight(products[productNum].weight_Amount)
        setQuantity(products[productNum].quantity)
        setSale(products[productNum].onsale)
        setDiscount(Number(products[productNum].salepercent * 100))
        setTags(products[productNum].hastags)
        setCurProdNum(productNum)
    }
    setShowProductSplash(true)
  }

  const addProduct = () => {
    if (!name || !price || !img || !desc || !weight || !weightUnit || !quantity || (sale && !discount)) {
        setSplashError(true)
        return
    }
    let productRef = null
    if (curProdNum) {
        productRef = ref(database, 'products/' + curProdNum)
    }
    else {
        productRef = ref(database, 'products/' + Number(products.length))
    }
    let newProduct = {
        name: name,
        price: Number(price),
        product_Image: img,
        prod_description: desc,
        weight_Amount: Number(weight),
        weight_Type: weightUnit,
        quantity: Number(quantity)
    }
    if (sale)
    {
        newProduct.onsale = true
        newProduct.salepercent = Number(discount/100)
    }
    else {
        newProduct.onsale = false
        newProduct.salepercent = ''
    }
    update(productRef, newProduct)
    .then(() => {
        fetchProducts()
        setShowProductSplash(false)
    })
    .catch((error) => console.log(error))
  }

  useEffect(() => {
    if (!showProductSplash)
    {
        setDesc('')
        setPrice('')
        setName('')
        setImg('')
        setWeightUnit('')
        setWeight('')
        setQuantity('')
        setSale(false)
        setDiscount('')
        setTags([])
        setCurProdNum(null)
        setSplashError(false)
    }
  }, [showProductSplash])

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
                setOrders([])
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
                else {
                    setUsers({})
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
    fetchProducts()
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
                    return <Codebox key={codeName} deleteCode={deleteCode} codeName={codeName} data={codes[codeName]} />
                })}
            </div>
        </div>

        <div className={styles.items}>
            <div className={styles.title}>Products</div>
            <button className={styles.lightBttn} id={styles.plusBttn} onClick={() => productScreen()}>+</button>
            <div className={styles.products}>
                {products !== {} && products.map((product, index) => {
                    return <Productbox key={index} productNum={index} data={product} productScreen={productScreen} />
                })}
            </div>
            {showProductSplash && <ProductSplash data={productVals} error={showSplashError} delete={removeProduct} add={addProduct} close={setShowProductSplash}/>}
        </div>
        </>)}
    </div>
  )
}

import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../products'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth, database } from '../firebase'
import { ref, get, set, remove, push } from 'firebase/database'


export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < PRODUCTS.length + 1; i++)
    {
        cart[i] = 0
    }
    return cart
}

export const ShopContextProvider = (props) => {
    const navigator = useNavigate()

    const taxRate = 0.0825
    const deliveryTime = 7

    // Shop vars:
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [isOpen, setIsOpen] = useState(false)
    const [numCartItems, setNumCartItems] = useState(0)

    // Authentication vars:
    const [authUser, setAuthUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)

    // User data vars:
    const [userCountry, setUserCountry] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userCity, setUserCity] = useState('')
    const [userState, setUserState] = useState('')
    const [userZip, setUserZip] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {setLoginError(null)})
        .catch((error) => {setLoginError(error)})
    }

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {setLoginError(null); initializeNewUser(userCredential)})
        .catch((error) => {setLoginError(error)})
    }

    const userLogOut = () => {
        signOut(auth)
        .then(() => {setLoginError(null)})
        .catch((error) => {setLoginError(error)})
        navigator('/')
    }

    const deleteAccount = (e) => {
        e.preventDefault()
        const credential = EmailAuthProvider.credential(email, password);
        reauthenticateWithCredential(authUser, credential)
        .then(() => {
            const userRef = ref(database, "users/" + authUser.uid)
            remove(userRef)
            deleteUser(authUser).catch((error) => console.log(error))
            navigator('/')
            setLoginError(null)
        })
        .catch((error) => {setLoginError(error)})
    }

    const initializeNewUser = (userCredential) => {
        console.log("Starting user " + userCredential.user.email + " DB creation...")
        const newUserRef = ref(database, "users/" + userCredential.user.uid)
        set(newUserRef, {
            address:'',
            city: '',
            country:'',
            state: '',
            email: userCredential.user.email,
        })
        .catch((error) => console.log(error))
        console.log("Initialization complete.")
    }

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            console.log("Detected auth change...")
            if (user) {
                setAuthUser(user)
            }
            else 
                setAuthUser(null)
        })

        return () => listen()
    }, [])

    // Load in user details when logged in:
    const updateUserInfo = () => {
        if (authUser) 
        {
            console.log("Starting database retreval...")
            const userRef = ref(database, "users/" + authUser.uid)
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("Successful retrieval!")
                    const data = snapshot.val()
                    setUserAddress(data.address)
                    setUserCountry(data.country)
                    setUserCity(data.city)
                    setUserState(data.state)
                    setUserZip(data.zip)
                }
            })
            .catch((error) => console.log(error))
        }
        else
        {
            setUserAddress('')
            setUserCountry('')
            setUserCity('')
            setUserState('')
            setUserZip('')
        }
    }
    useEffect(() => {updateUserInfo()}, [authUser])


    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItems)
        {
            if (cartItems[item] > 0) 
            {
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item))
                totalAmount += cartItems[item] * itemInfo.price
            }
        }

        return totalAmount
    }

    const processCheckout = (country, add, city, state, zip, email) => {
        const ordersRef = ref(database, 'orders')
        const newOrderRef = push(ordersRef)

        // Get the current date
        const currentDate = new Date()

        // Extract the components of the date (year, month, day)
        let year = currentDate.getFullYear()
        let month = String(currentDate.getMonth() + 1).padStart(2, '0')
        let day = String(currentDate.getDate()).padStart(2, '0')

        // Assemble the date string in the desired format (e.g., "YYYY-MM-DD")
        const dateString = `${year}-${month}-${day}`

        // Get estimated delivery date:
        let deliveryDate = new Date()
        deliveryDate.setDate(deliveryDate.getDate() + deliveryTime) // Add delivery time (in days)
        year  = deliveryDate.getFullYear()
        month = String(deliveryDate.getMonth() + 1).padStart(2, '0')
        day   = String(deliveryDate.getDate()).padStart(2, '0')
        const deliveryString = `${year}-${month}-${day}`
        console.log(deliveryString)

        let order = {
            amount: Number(getTotalCartAmount()*(1+taxRate)),
            date: dateString,
            deliveryDate: deliveryString,
            country: country,
            add: add,
            city: city,
            state: state,
            zip: zip,
            active: true
        }

        if (authUser){
            order.uid = authUser.uid
        }
        order.email = email

        const productsRef = ref(database, "products")
        // Get the number of products:
        console.log(cartItems)
        let numProds = 0
        get(productsRef)
        .then((snapshot) => {
            if (snapshot.exists()){
                numProds = Object.keys(snapshot.val()).length
                if (!order.items) {
                    order.items = {}; // Make sure order.items is defined
                }
                for (let i = 1; i <= numProds; i++)
                {
                    if (cartItems[i] > 0) // If this product is in the cart...
                    {
                        console.log("Item " + i + " is in cart.")
                        order.items[String(i)] = cartItems[i]
                    }
                }
                console.log(order.items)
                set(newOrderRef, order)
            }
        })


        // Check for and set a subscription if it exists.
        
        return newOrderRef.key
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]+1}))
        setNumCartItems(numCartItems + 1)
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
        setNumCartItems(numCartItems - 1)
    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }

    const toggleOpen = () => {
        console.log('Toggled to ' + isOpen)
        setIsOpen(!isOpen)
    }

    const resetCart = () => {
        setCartItems(getDefaultCart())
        setNumCartItems(0)
    }

    const contextValue = {cartItems, authUser, isOpen, numCartItems, email, password, loginError, userAddress, userCity, userCountry, userState, userZip, taxRate, processCheckout, deleteAccount, updateUserInfo, setEmail, setPassword, setCartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, toggleOpen, resetCart, signIn, signUp, userLogOut}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

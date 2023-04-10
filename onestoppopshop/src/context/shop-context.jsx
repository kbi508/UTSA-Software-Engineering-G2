import React, { createContext, useState, useEffect } from 'react'
import { PRODUCTS } from '../products'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, database } from '../firebase'
import { ref, get, set } from 'firebase/database'


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
    const [userCredit, setUserCredit] = useState(0)
    const [userCountry, setUserCountry] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userCity, setUserCity] = useState('')
    const [userState, setUserState] = useState('')
    const [userZip, setUserZip] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {setLoginError(null)})
        .catch((error) => {setLoginError(error)})
    }

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {setLoginError(null)})
        .catch((error) => {setLoginError(error)})
    }

    const userLogOut = () => {
        signOut(auth)
        .then(() => console.log('Success!'))
        .catch((error) => console.log(error))
    }


    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
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
          const userRef = ref(database, "users/user1")
          get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log("Successful retrieval!")
                const data = snapshot.val()
                setUserCredit(data.credits)
                setUserAddress(data.address)
                setUserCountry(data.country)
                setUserCity(data.city)
                setUserState(data.state)
                setUserZip(data.zip)
            }
          })
          .catch((error) => console.log(error))
        }
    }
    useEffect(() => updateUserInfo, [authUser])


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

    const contextValue = {cartItems, authUser, isOpen, numCartItems, email, password, loginError, userAddress, userCity, userCountry, userState, userZip, userCredit, updateUserInfo, setEmail, setPassword, setCartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, toggleOpen, resetCart, signIn, signUp, userLogOut}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

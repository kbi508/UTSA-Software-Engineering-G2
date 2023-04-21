import React, { createContext, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { auth, database } from '../firebase'
import { ref, get, set, remove, push } from 'firebase/database'


export const ShopContext = createContext(null)

export const ShopContextProvider = (props) => {
    const navigator = useNavigate()
    const location = useLocation()

    const taxRate = 0.0825
    const deliveryTime = 7

    // Shop vars:
    const [cartItems, setCartItems] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    const [numCartItems, setNumCartItems] = useState(0)

    // Authentication vars:
    const [authUser, setAuthUser] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState(null)
    const [authIsAdmin, setAuthIsAdmin] = useState(false)

    // User data vars:
    const [userCountry, setUserCountry] = useState('')
    const [userAddress, setUserAddress] = useState('')
    const [userCity, setUserCity] = useState('')
    const [userState, setUserState] = useState('')
    const [userZip, setUserZip] = useState('')

    // Product Fetching:
    const [products, setProducts] = useState([])
    const fetchProducts = async () => {
        try {
        const productsRef = ref(database, 'products')
        get(productsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                Object.keys(data).forEach((prodNum) => {
                    data[prodNum].prodNum = Number(prodNum)
                })
                setProducts(data)
            }
            else {
                setProducts([])
            }
        })
        }
        catch (error) {
            console.log(error)
        }
    }

    // Discount Code saving/checking:
    const [code, setCode] = useState('')
    const [codes, setCodes] = useState({})
    const [codeGood, setCodeGood] = useState(null)
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

    const checkCode = (email='') => {
        console.log('Checking code ' + code)
        let validCode = false
        if (!email) {
            if (authUser)
                email = authUser.email
            else {
                setCodeGood(validCode)
                return validCode
            }
        }
        Object.keys(codes).forEach((realCode) => {
            if (code === realCode) {
                if (realCode.usersRedeemed) {
                    for (let i = 0; i < realCode.usersRedeemed.length; i++) {
                        if (realCode.usersRedeemed[i] === email) {
                            validCode = false
                            break
                        }
                        else
                            validCode = true
                    }
                }
                else
                    validCode = true
            }
        })
        console.log('Code is ' + validCode)
        setCodeGood(validCode)
        return validCode
    }

    // Start up:
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            console.log("Detected auth change...")
            if (user) {
                setAuthUser(user)
                const userRef = ref(database, 'users/' + user.uid)
                get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists())
                    {
                        const data = snapshot.val()
                        console.log(data)
                        setAuthIsAdmin(data.admin)
                        console.log(data.admin)
                    }
                })
                .catch((error) => console.log(error))
            }
            else 
                setAuthUser(null)
        })

        // Get products:
        fetchProducts()
        .then(() => {
            setCartItems({})
        })
        .catch((error) => console.log(error))

        // Get codes:
        fetchCodes()
        .catch((error) => console.log(error))
        setCode('')

        return () => listen()
    }, [])

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setLoginError(null)
        })
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
            admin: false
        })
        .catch((error) => console.log(error))
        console.log("Initialization complete.")
    }

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
        // Need to find proper item since products order is not guaranteed.
        Object.keys(cartItems).forEach((prodNum) => { 
            products.forEach((product) => {
                if (product && product.prodNum === Number(prodNum))
                    totalAmount += (product.price * cartItems[prodNum])
            })
        })
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

        order.items = cartItems

        set(newOrderRef, order)        
        return newOrderRef.key
    }

    const addToCart = (itemId) => {
        if (cartItems[itemId]) 
            setCartItems((prev) => ({...prev, [itemId]: Number(prev[itemId]+1)}))
        else
            setCartItems((prev) => ({...prev, [itemId]: Number(1)}))
        setNumCartItems(numCartItems + 1)
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId]-1}))
        setNumCartItems(numCartItems - 1)
    }
    
    useEffect(() => {
        if (numCartItems === 0 && location.pathname === "/checkout") // If they empty their cart at checkout, boot them back to the store.
        {
            toggleOpen()
            navigator('/')
        }
    }, [numCartItems])

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: newAmount}))
    }

    const toggleOpen = () => {
        console.log('Toggled to ' + isOpen)
        setIsOpen(!isOpen)
    }

    const resetCart = () => {
        setCartItems({})
        setNumCartItems(0)
    }

    const contextValue = {codeGood, code, codes, products, cartItems, authIsAdmin, authUser, isOpen, numCartItems, email, password, loginError, userAddress, userCity, userCountry, userState, userZip, taxRate, checkCode, setCodeGood, fetchCodes, setCode, setProducts, fetchProducts, processCheckout, deleteAccount, updateUserInfo, setEmail, setPassword, setCartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount, toggleOpen, resetCart, signIn, signUp, userLogOut}

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

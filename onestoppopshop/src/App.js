import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Checkout } from './pages/checkout/checkout'
import { Account } from './pages/account/account'
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <Router>
        <ShopContextProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </div>
  );
}

export default App;

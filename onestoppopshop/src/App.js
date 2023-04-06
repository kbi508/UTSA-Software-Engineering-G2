import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Checkout } from './pages/checkout/checkout'
import { Account } from './pages/account/account'
import { Admin } from './pages/admin/admin'
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<Account />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;

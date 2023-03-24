import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Bargins } from './pages/bargins/bargins'
import { Cart } from './pages/cart/cart'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/bargins" element={<Bargins />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

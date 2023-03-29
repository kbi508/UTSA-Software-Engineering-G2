import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from "./components/navbar"
import { Shop } from './pages/shop/shop'
import { Bargins } from './pages/bargins/bargins'
import { Cart } from './components/cart'
import { ShopContextProvider } from './context/shop-context';

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/bargins" element={<Bargins />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;

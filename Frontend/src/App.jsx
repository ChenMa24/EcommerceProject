import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/CheckoutPage'
import { OrdersPage } from './pages/OrdersPage'
import { TrackingPage } from './pages/TrackingPage'

function App() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {

    const fetchAppData = async () => {
      const cartItems = await axios.get('/api/cart-items?expand=product');
      setCartItems(cartItems.data);
    }
    fetchAppData();
  }, []) // empty dependency array means this will only run once when the component mounts

  return (
    <Routes>
      <Route path='/' element={<HomePage cartItems={cartItems} />} />
      <Route path="checkout" element={<CheckoutPage cartItems={cartItems} />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  )
}

export default App

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
    axios.get('/api/cart-items')
      .then((response) => {
        setCartItems(response.data)
      })
      .catch((error) => {
        console.error('Error fetching cart items:', error);
      })
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

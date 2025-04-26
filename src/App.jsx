import React from 'react'
import './App.css'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Products from './pages/products'
import Admin from './pages/admin'
import ProductPage from './pages/product-page'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/products'>
                <Route index element={<Products />} />
                <Route path=':id' element={<ProductPage />} />
              </Route>
              <Route path='/admin' element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  )
}

export default App

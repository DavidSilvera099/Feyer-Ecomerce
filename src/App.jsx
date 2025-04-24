import './App.css'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Products from './pages/products'
import Offers from './pages/offers'
import Cart from './pages/cart'
import Admin from './pages/admin'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<Products />} />
        <Route path='/offers' element={<Offers />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

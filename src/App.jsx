import './App.css'
import Header from './components/layouts/header'
import Footer from './components/layouts/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './components/auth/login'
import Register from './components/auth/register'
import Products from './pages/products'
import Cart from './pages/cart'
import Admin from './pages/admin'
import ProductPage from './pages/product-page'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products'>
          <Route index element={<Products />} />
          <Route path=':id' element={<ProductPage />} />
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App

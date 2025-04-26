import React, { useState, useEffect } from 'react'
import logo from '../../assets/logo feyer.svg'
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { HiMenuAlt3 } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import CartDrawer from '../sections/cart-drawer';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin);
        }
      } else {
        setIsAdmin(false);
      }
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="relative">
      <div className='flex justify-between items-center px-4 md:px-22 py-2 shadow-md'>
        <div className='flex items-center gap-4'>
          {/* Menú hamburguesa para móvil */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HiMenuAlt3 />
          </button>

          <Link to="/">
            <img src={logo} alt="logo" className='w-16 md:w-20 h-16 md:h-20' loading="lazy" />
          </Link>
        </div>

        {/* Menú de navegación */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none z-50`}>
          <ul className='flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8 text-xl font-light p-4 md:p-0'>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Inicio</Link></li>
            <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Productos</Link></li>
            {isAdmin && <li><Link to="/admin" onClick={() => setIsMenuOpen(false)}>Administrador</Link></li>}
          </ul>
        </nav>

        <div className='hidden md:flex justify-between items-center gap-4'>
          {user && (
            <button 
              onClick={openCart}
              className="text-3xl cursor-pointer"
            >
              <IoBagOutline />
            </button>
          )}
          {!user ? (
            <Link to="/login" className="text-2xl cursor-pointer">
              <FaRegUser />
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-2xl cursor-pointer">
              <FiLogOut />
            </button>
          )}
        </div>

        {/* Iconos para móvil */}
        <div className='md:hidden flex items-center gap-4'>
          {user && (
            <button 
              onClick={openCart}
              className="text-2xl cursor-pointer"
            >
              <IoBagOutline />
            </button>
          )}
          {!user ? (
            <Link to="/login" className="text-xl cursor-pointer">
              <FaRegUser />
            </Link>
          ) : (
            <button onClick={handleLogout} className="text-xl cursor-pointer">
              <FiLogOut />
            </button>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={closeCart} 
      />
    </header>
  )
}

export default Header
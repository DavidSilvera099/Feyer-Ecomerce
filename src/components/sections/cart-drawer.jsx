import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";
import CartItemCard from '../utils/cart-item-card.jsx';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Controlar el scroll del body cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    // Limpiar el efecto cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Calcular el total del carrito
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Carrito</h2>
            <button 
              onClick={onClose}
              className="text-2xl hover:text-gray-600"
            >
              <IoClose />
            </button>
          </div>
          
          <div className="h-[calc(100vh-12rem)] overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">El carrito está vacío</p>
            ) : (
              cartItems.map(item => (
                <CartItemCard
                  key={item.cartItemId}
                  product={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" onClick={onClose} className="flex justify-center w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                Proceder al pago
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CartDrawer
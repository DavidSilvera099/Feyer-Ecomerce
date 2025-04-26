import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import CartItemCard from '../components/utils/cart-item-card';

const Checkout = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calcular el total del carrito
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Generar el mensaje de WhatsApp
  const generateWhatsAppMessage = () => {
    const itemsText = cartItems.map(item => 
      `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');
    
    const message = `¡Hola! Quiero realizar la siguiente compra:%0A%0A${itemsText}%0A%0ATotal: $${total.toFixed(2)}`;
    return `https://wa.me/573170433217?text=${message}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <Link 
            to="/products" 
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Ver productos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Productos en el carrito</h2>
            <div className="space-y-4 max-w-[400px]">
              {cartItems.map(item => (
                <CartItemCard
                  key={item.id}
                  product={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="text-xl font-semibold mb-4">Resumen de la compra</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-600 text-white text-center py-3 rounded hover:bg-green-700"
              >
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
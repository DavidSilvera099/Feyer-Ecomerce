import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Cargar items del localStorage al inicializar
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Guardar en localStorage cada vez que cambie cartItems
  useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito en localStorage:', error);
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === product.id && item.quantity + product.quantity <= item.stock
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      
      // Generar un ID único para el nuevo item
      const uniqueId = `${product.id}-${Date.now()}`;
      return [...prevItems, { ...product, cartItemId: uniqueId }];
    });
  };

  const updateQuantity = (product, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (product) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.cartItemId !== product.cartItemId)
    );
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    updateQuantity,
    removeFromCart,
    openCart,
    closeCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
}; 
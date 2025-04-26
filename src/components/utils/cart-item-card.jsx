import React from 'react';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';

const CartItemCard = ({ product, onUpdateQuantity, onRemove }) => {
  const { name, price, image, quantity, stock } = product;
  const totalPrice = price * quantity;

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="w-20 h-20 flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-1">
        <h3 className="font-medium">{name}</h3>
        <p className="font-medium">
          ${parseFloat(totalPrice).toFixed(2)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button 
            onClick={() => onUpdateQuantity(product, quantity - 1)}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <FaMinus size={12} />
          </button>
          
          <span className="w-8 text-center">{quantity}</span>
          
          <button 
            onClick={() => onUpdateQuantity(product, quantity + 1)}
            disabled={quantity >= stock}
            className={`p-1 hover:bg-gray-100 rounded ${quantity >= stock ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>
      
      <div className="relative">
        <button 
          onClick={() => onRemove(product)}
          className="text-red-500 hover:text-red-700 absolute bottom-0 right-0"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard; 
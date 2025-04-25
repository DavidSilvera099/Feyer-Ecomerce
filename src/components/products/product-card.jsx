import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="bg-white overflow-hidden cursor-pointer">
        <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-0 right-0 bg-black text-white p-2 rounded-full">
                <span className="text-xs font-bold">${product.price}</span>
            </div>
        </div>
      <div className="">
        <h3 className="text-3xl my-2 capitalize">{product.name}</h3>
        <p className="text-xl font-light">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
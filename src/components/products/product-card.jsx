import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="bg-white overflow-hidden cursor-pointer">
        <div className="relative">
            <img src={product.image} alt={product.name} className="w-100 h-full object-cover" loading="lazy" />
            {product.discount > 0 && (
                <div className="absolute top-4 left-0 bg-[#1D1E20] text-white py-1 md:py-2 px-2 md:px-4">
                    <span className="text-sm md:text-md uppercase">descuento</span>
                </div>
            )}
        </div>
      <div className="">
        <h3 className="text-xl md:text-3xl mb-1 md:mb-2 mt-2 md:mt-4 capitalize">{product.name}</h3>
        <p className="text-base md:text-xl font-light">
          {product.discount > 0 ? (
            <>
              <span className="line-through text-gray-500 mr-2">${product.originalPrice}</span>
              <span>${product.price}</span>
            </>
          ) : (
            <span>${product.price}</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
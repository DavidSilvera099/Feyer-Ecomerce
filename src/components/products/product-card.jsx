import React from 'react'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white overflow-hidden">
        <div className="relative">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.discount > 0 && (
                <div className="absolute top-4 left-0 bg-[#1D1E20] text-white py-2 px-4">
                    <span className="text-md uppercase">descuento</span>
                </div>
            )}
        </div>
      <div className="">
        <h3 className="text-3xl mb-2 mt-4 capitalize">{product.name}</h3>
        <p className="text-xl font-light">
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
    </div>
  );
};

export default ProductCard;
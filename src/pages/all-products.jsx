import React from 'react';
import ProductGrid from '../components/products/product-grid';
import OffersBanner from '../components/sections/offers-banner';

const AllProducts = () => {
  return (
    <div className="flex flex-col gap-8">
      <h2 className='text-2xl md:text-4xl text-center text-[#1C2838] font-semibold pt-8'>Todos los Productos</h2>
      <ProductGrid />
      <OffersBanner />
    </div>
  );
};

export default AllProducts;

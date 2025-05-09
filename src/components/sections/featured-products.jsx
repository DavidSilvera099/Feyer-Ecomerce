import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import ProductCard from '../products/product-card';
import { Link } from 'react-router-dom';


const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef, limit(3)); // Limitar a 8 productos destacados
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1C2838]"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto py-4 md:py-8 my-6 md:my-10 flex flex-col gap-6 md:gap-12 px-4 md:px-0">
      <h2 className='text-2xl md:text-4xl text-center text-[#1C2838]'>Productos destacados</h2>
      <div className='flex justify-center px-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-4 md:mt-6'>
        <Link to='/products' className='bg-[#1C385C] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-light uppercase w-fit'>Todos los productos</Link>
      </div>
    </div>
  );
};

export default FeaturedProducts;
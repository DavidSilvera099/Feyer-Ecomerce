import React, { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import SpinnerLoading from "../utils/SpinnerLoading";
import ProductSearchFilters from "./product-search-filters";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const q = query(productsRef);
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsList);
        setFilteredProducts(productsList);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col gap-8 px-4">
      <ProductSearchFilters 
        products={products}
        onFilteredProductsChange={setFilteredProducts}
      />
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
          {loading ? (
            <SpinnerLoading />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-base md:text-lg">No se encontraron productos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;

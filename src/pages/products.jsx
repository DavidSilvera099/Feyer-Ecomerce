import React, { useEffect } from "react";
import ProductCard from "../components/products/product-card";
import { Link } from "react-router";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";

const products = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
      const fetchProducts = async () => {
        try {
          const productsRef = collection(db, 'products');
          const q = query(productsRef); // Limitar a 8 productos destacados
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
  
  return (
    <div className="mx-auto py-8 my-10 flex flex-col gap-12">
      <h2 className='text-4xl text-center text-[#1C2838]'>Todos los Productos</h2>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          { loading ? <p>Cargando productos...</p> 
          : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) }
        </div>
      </div>
      
    </div>
  );
};

export default products;

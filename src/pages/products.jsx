import React, { useEffect } from "react";
import ProductCard from "../components/products/product-card";
import { fetchProducts } from "../firebase/api/products";
import SpinnerLoading from "../components/utils/SpinnerLoading";

const products = () => {
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetchProducts({setLoading, setProducts});
  }, []);

  if (loading) return <SpinnerLoading />;
  return (
    <div className="mx-auto py-8 my-10 flex flex-col gap-12">
      <h2 className="text-4xl text-center text-[#1C2838]">
        Todos los Productos
      </h2>
      <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
          {products.length === 0 && <p className="text-center py-20 text-red-500">No hay productos disponibles.</p>}
      </div>
    </div>
  );
};

export default products;

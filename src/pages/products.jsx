import React, { useEffect, useState } from "react";
import ProductCard from "../components/products/product-card";
import { Link } from "react-router";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { CiSearch, CiFilter } from "react-icons/ci";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [categories, setCategories] = useState([]);

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
        
        // Extraer categorías únicas
        const uniqueCategories = [...new Set(productsList.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    // Filtrar por categoría
    if (selectedCategory !== "todos") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="mx-auto py-8 flex flex-col gap-12">
      <div className="flex flex-col gap-4">
        <h2 className='text-4xl text-center text-[#1C2838]'>Todos los Productos</h2>
        {/* Barra de búsqueda y filtros */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Buscar productos..."
            className="px-4 py-2 border w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl" />
        </div>
        
        <div className="relative w-full md:w-fit">
          <select
            className="px-2 py-2 pl-10 border w-full appearance-none"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="todos">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <CiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl" />
        </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {loading ? (
            <p>Cargando productos...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center">No se encontraron productos</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

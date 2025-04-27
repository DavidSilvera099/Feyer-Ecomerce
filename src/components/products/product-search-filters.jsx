import React, { useEffect, useState } from "react";
import { CiSearch, CiFilter } from "react-icons/ci";

const ProductSearchFilters = ({ 
  products,
  onFilteredProductsChange
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [categories, setCategories] = useState([]);

  // Extraer categorías únicas de los productos
  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  // Filtrar productos
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
    
    onFilteredProductsChange(filtered);
  }, [searchTerm, selectedCategory, products, onFilteredProductsChange]);

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Buscar productos..."
          className="px-3 md:px-4 py-2 border w-full text-sm md:text-base"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
      </div>
      <div className="relative w-full md:w-fit">
        <select
          className="px-2 md:px-4 py-2 pl-8 md:pl-10 border w-full appearance-none text-sm md:text-base"
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
        <CiFilter className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 text-lg md:text-xl" />
      </div>
    </div>
  );
};

export default ProductSearchFilters; 
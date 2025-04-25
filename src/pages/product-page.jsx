import React, { useState, useEffect } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../firebase/api/products";
import SpinnerLoading from "../components/utils/SpinnerLoading";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchProduct({setProduct, setLoading, id});
  }, [id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
   if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
    if (product && quantity >= product.stock) {
      setQuantity(product.stock);
    }
    if (!product) return;
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === "") {
      setQuantity(1);
    }
  };

  const handleAddToBag = () => {
    if (!product) return;

    const productInfo = {
      ...product,
      quantity,
      totalPrice: product.price * quantity,
    };
    setQuantity(1); 

    console.log("Agregado al carrito:", productInfo);
  };

  if (loading) return <SpinnerLoading />;

  if (!product) {
    return (
      <p className="text-center py-20 text-red-500">Producto no encontrado.</p>
    );
  }

  return (
    <div className="container mx-auto py-8 md:py-[100px] px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start">
        {/* imagen del producto */}
        <div className="bg-gray-900 w-full md:w-[600px] h-auto aspect-square rounded-md overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        {/* detalles del producto */}
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-1 md:space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-lg md:text-xl font-light text-gray-600">
              ${parseFloat(product.price).toFixed(2)}
            </p>
            <p className="text-base md:text-lg">Total: ${(product.price * quantity).toFixed(2)}</p>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center border border-gray-300">
              <button
                className="px-2 md:px-3 py-2 hover:bg-gray-100"
                aria-label="Disminuir"
                onClick={decreaseQuantity}
              >
                <FaMinus className="text-gray-600" size={8} />
              </button>
              <input
                className="w-10 md:w-12 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base"
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Cantidad de productos"
              />
              <button
                className="px-2 md:px-3 py-2 hover:bg-gray-100"
                aria-label="Incrementar"
                onClick={increaseQuantity}
              >
                <FaPlus className="text-gray-600" size={8} />
              </button>
            </div>
            <span className="text-sm md:text-base text-gray-600">{product.stock > 0 ? product.stock : 0} {product.stock > 0 ? 'en stock' : 'sin stock'}</span>
          </div>

          <button
            className="flex w-full md:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-800 hover:bg-gray-700 text-white text-sm md:text-base"
            onClick={handleAddToBag}
          >
            <HiShoppingBag className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Agregar al carrito
          </button>

          <div className="space-y-2 md:space-y-4 pt-2 md:pt-4">
            <p className="text-sm md:text-base text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

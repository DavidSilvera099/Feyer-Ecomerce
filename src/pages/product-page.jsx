import React, { useState, useEffect } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../firebase/api/products";
import SpinnerLoading from "../components/utils/SpinnerLoading";
import { useCart } from "../context/CartContext";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { addToCart, openCart } = useCart();

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
      id: product.id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.image,
      quantity: quantity
    };
    
    addToCart(productInfo);
    openCart();
    setQuantity(1);
  };

  if (loading) return <SpinnerLoading />;

  if (!product) {
    return (
      <p className="text-center py-20 text-red-500">Producto no encontrado.</p>
    );
  }

  return (
    <div className="container mx-auto py-18 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 items-start">
        {/* imagen del producto */}
        <div className="bg-gray-900 w-full md:w-[600px] h-auto aspect-square overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
        {/* detalles del producto */}
        <div className="space-y-4 md:space-y-8">
            <h1 className="text-2xl md:text-6xl capitalize">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              {product.discount > 0 ? (
                <>
                  <p className="text-xl md:text-xl font-light text-gray-600 line-through">
                    ${parseFloat(product.originalPrice).toFixed(2)}
                  </p>
                  <p className="text-xl">${(product.price * quantity).toFixed(2)}</p>
                </>
              ) : (
                <p className="text-xl">${(product.price * quantity).toFixed(2)}</p>
              )}
            </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="flex items-center border h-12 border-gray-300">
              <button
                className="px-2 md:px-3 py-2 hover:bg-gray-100 border-r border-gray-300"
                aria-label="Disminuir"
                onClick={decreaseQuantity}
              >
                <FaMinus className="text-gray-600" size={10} />
              </button>
              <input
                className="w-10 md:w-12 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base"
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Cantidad de productos"
              />
              <button
                className="px-2 md:px-3 py-2 hover:bg-gray-100 border-l border-gray-300"
                aria-label="Incrementar"
                onClick={increaseQuantity}
              >
                <FaPlus className="text-gray-600" size={12} />
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

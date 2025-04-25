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
    <div className="container mx-auto py-[100px] px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* imagen del producto */}
        <div className="bg-gray-900 w-[600px] h-[600px] rounded-md overflow-hidden">
          <img
            src={product.image || "https://via.placeholder.com/600"}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        {/* detalles del producto */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {product.name}
            </h1>
            <p className="text-xl font-light text-gray-600">
              ${product.price.toFixed(2)}
            </p>
            <p>Total: ${(product.price * quantity).toFixed(2)}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300">
              <button
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Disminuir"
                onClick={decreaseQuantity}
              >
                <FaMinus className="text-gray-600" size={10} />
              </button>
              <input
                className="w-12 text-center border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                value={quantity}
                onChange={handleQuantityChange}
                aria-label="Cantidad de productos"
              />
              <button
                className="px-3 py-2 hover:bg-gray-100"
                aria-label="Incrementar"
                onClick={increaseQuantity}
              >
                <FaPlus className="text-gray-600" size={10} />
              </button>
            </div>
            <span className="text-gray-600">{product.stock > 0 ? product.stock : 0} {product.stock > 0 ? 'en stock' : 'sin stock'}</span>
          </div>

          <button
            className="flex w-full md:w-auto px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white"
            onClick={handleAddToBag}
          >
            <HiShoppingBag className="mr-2 h-5 w-5" />
            Agregar al carrito
          </button>

          <div className="space-y-4 pt-4">
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

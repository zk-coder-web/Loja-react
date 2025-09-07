import React, { useContext, useState } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductCard = ({ product, darkMode }) => {
  const { navigateTo, setSelectedProduct, addToCart } =
    useContext(ProductContext);

  const [isHovered, setIsHovered] = useState(false);

  const soldCount =
    product.soldCount || Math.floor(Math.random() * (300 - 50 + 1)) + 50;

  const handleViewDetails = () => {
    setSelectedProduct(product);
    navigateTo("productDetail");
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.floor(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 5;

  return (
    <div
      onClick={handleViewDetails}
      className={`w-full sm:w-48 md:w-52 lg:w-56 rounded-md overflow-hidden border cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col ${
        darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      
      <div
        className="relative pt-[100%] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        {hasDiscount && (
          <div className="absolute top-1 left-1 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded">
            -{discountPercentage}%
          </div>
        )}
      </div>

      
      <div className="flex flex-col flex-grow p-2 min-h-[120px]">
        <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug mb-1">
          {product.name}
        </h3>

        <div className="flex flex-col items-start mb-1">
          {hasDiscount && (
            <p className="text-gray-400 dark:text-gray-300 text-[10px] sm:text-[11px] line-through">
              R$ {product.oldPrice.toFixed(2)}
            </p>
          )}
          <p className="text-black dark:text-white text-[14px] sm:text-[15px] md:text-[16px] font-bold">
            R$ {product.price.toFixed(2)}
          </p>
          {hasDiscount && (
            <span className="text-green-400 text-[10px] sm:text-[11px] mt-0.5">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        
        <p className="text-gray-700 dark:text-gray-300 text-[10px] sm:text-[11px] mt-auto text-left">
          {soldCount} vendidos
        </p>

        
        <button
          onClick={handleAddToCart}
          className="mt-2 bg-cyan-400 hover:bg-cyan-500 text-white text-[12px] sm:text-[13px] md:text-[14px] font-semibold py-2 w-full rounded transition-colors duration-200"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

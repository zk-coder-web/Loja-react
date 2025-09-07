import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const HomePage = () => {
  const { filteredProducts, searchTerm, setSearchTerm, navigateTo } =
    useContext(ProductContext);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const slides = [
    {
      text: "Compra 100% segura",
      icon: <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />,
    },
    {
      text: "Frete grátis em todas as compras",
      icon: <CheckCircleIcon className="w-4 h-6 text-cyan-400" />,
    },
    {
      text: "+5 mil avaliações",
      icon: <ShieldCheckIcon className="w-6 h-6 text-cyan-400" />,
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`w-full transition-colors duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative w-full">
        <img
          src="src/assets/banner.png"
          alt="Banner de promoção"
          className="w-full h-56 sm:h-64 md:h-[28rem] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-cyan-500/60"></div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
          <button
            onClick={() => navigateTo("reviews")}
            className="px-6 py-3 bg-cyan-500/90 hover:bg-cyan-400/90 text-black font-bold rounded-full shadow-lg backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-300"
          >
            Ver Avaliações
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-0 mt-6">
        <div className="flex justify-center mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar produtos..."
            className="w-full md:w-2/4 px-4 py-2 rounded-lg shadow-md border-2 border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-colors duration-300 dark:bg-gray-900 dark:text-white"
          />
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-md font-bold transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-black via-cyan-900/70 to-gray-900 text-white hover:from-gray-800 hover:via-cyan-800/80 hover:to-gray-900"
                : "bg-gradient-to-r from-white via-cyan-100/50 to-gray-200 text-black hover:from-gray-100 hover:via-cyan-200/60 hover:to-white"
            }`}
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5" />
            ) : (
              <MoonIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-300 text-xl py-10 transition-colors duration-500">
            Nenhum produto encontrado.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                darkMode={darkMode}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default HomePage;

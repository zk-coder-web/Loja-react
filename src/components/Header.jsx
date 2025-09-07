import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/zc.png";
import "./Header.css";

const Header = ({ setShowLoginModal }) => {
  const { cartItemCount, navigateTo } = useContext(ProductContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const textColor = darkMode ? "text-white" : "text-black";
  const bgMenu = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 shadow-md ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-16 px-4 sm:px-6 md:px-8 gap-4 md:gap-8 relative z-10 flex-wrap">
        <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`${textColor} text-xl sm:text-2xl md:text-3xl`}
          >
            <FaBars />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${textColor} text-xl sm:text-2xl md:text-3xl z-10 ml-2`}
          >
            {darkMode ? (
              <SunIcon className="w-6 h-6" />
            ) : (
              <MoonIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        <motion.div
          className="flex items-center gap-2 md:gap-3 cursor-pointer flex-shrink"
          onClick={() => navigateTo("home")}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
          />
          <span
            className={`${textColor} text-sm sm:text-base md:text-lg font-fontzc whitespace-nowrap`}
          >
            Zark Company
          </span>
        </motion.div>

        <div className="flex items-center gap-3 md:gap-6 flex-shrink-0">
          <button onClick={() => navigateTo("cart")} className="relative">
            <FaShoppingCart
              className={`${textColor} text-xl sm:text-2xl md:text-3xl`}
            />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          <button onClick={() => setShowLoginModal(true)}>
            <FaUserCircle
              className={`${textColor} text-xl sm:text-2xl md:text-3xl`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex"
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3 }}
              className={`w-64 h-full p-6 shadow-lg ${bgMenu}`}
            >
              <button
                className={`${textColor} text-2xl mb-6`}
                onClick={() => setMenuOpen(false)}
              >
                ✖
              </button>
              <nav
                className={`flex flex-col gap-5 ${textColor} text-base md:text-lg`}
              >
                <button onClick={() => navigateTo("home")}>Início</button>
                <button onClick={() => navigateTo("camisetas")}>
                  Camisetas
                </button>
                <button onClick={() => navigateTo("bermudas")}>Bermudas</button>
                <button onClick={() => navigateTo("kits")}>Kits</button>
              </nav>
            </motion.div>
            <div className="flex-1" onClick={() => setMenuOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

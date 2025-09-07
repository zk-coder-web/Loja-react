import React, { useState, useContext, useEffect } from "react";
import { ProductContext, ProductProvider } from "./context/ProductContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Wishlist from "./pages/Wishlist";
import AccountPage from "./pages/AccountPage";
import ReviewsPage from "./pages/ReviewsPage";

import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";

import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const AppContent = () => {
  const { currentPage } = useContext(ProductContext);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const renderView = () => {
    switch (currentPage) {
      case "products":
        return <HomePage />;
      case "productDetail":
        return <ProductDetail />;
      case "cart":
        return <Cart />;
      case "checkout":
        return <Checkout />;
      case "confirmation":
        return <Confirmation />;
      case "wishlist":
        return <Wishlist />;
      case "account":
        return <AccountPage />;
      case "reviews":
        return <ReviewsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-500 bg-white text-black dark:bg-black dark:text-white">
      <div className="fixed top-5 right-5 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-md 
                     bg-cyan-400 text-black font-bold hover:bg-cyan-500 
                     transition-colors duration-300"
        >
          {darkMode ? (
            <>
              <SunIcon className="w-5 h-5" /> Claro
            </>
          ) : (
            <>
              <MoonIcon className="w-5 h-5" /> Escuro
            </>
          )}
        </button>
      </div>

      <Header
        setShowLoginModal={setShowLoginModal}
        setShowRegisterModal={setShowRegisterModal}
      />

      <div className="flex-grow pt-24 container mx-auto px-4">
        {renderView()}
      </div>

      <Footer />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </div>
  );
};

const App = () => (
  <ProductProvider>
    <AppContent />
  </ProductProvider>
);

export default App;

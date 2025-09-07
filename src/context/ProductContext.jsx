import React, { createContext, useState, useMemo, useEffect } from "react";
import { products } from "../data/productsData";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState("products");
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("Todos");
  const [sortOption, setSortOption] = useState("default");
  const [wishlist, setWishlist] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [theme, setTheme] = useState("dark");

  // 🔄 Tema escuro / claro
  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.remove("bg-gray-100", "text-gray-900");
      document.body.classList.add("bg-gray-900", "text-gray-100");
    } else {
      document.body.classList.remove("bg-gray-900", "text-gray-100");
      document.body.classList.add("bg-gray-100", "text-gray-900");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const resetCheckout = () => {
    setCartItems([]);
    setOrderConfirmed(false);
    setSelectedProduct(null);
  };

  // 🔄 Navegação
  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page === "products") {
      setSelectedProduct(null);
      setOrderConfirmed(false);
    }
  };

  // 🛒 Adicionar item ao carrinho
  const addToCart = (product, size = "Único", color = "Padrão") => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        { ...product, selectedSize: size, selectedColor: color, quantity: 1 },
      ]);
    }
  };

  // 🛒 Efeito de animação (opcional)
  const addToCartWithAnimation = (product, productRect) => {
    const cartIcon = document.getElementById("cart-icon");
    if (!cartIcon) {
      addToCart(product);
      return;
    }

    const cartRect = cartIcon.getBoundingClientRect();
    const imgClone = document.createElement("img");
    imgClone.src = product.image;
    imgClone.style.position = "fixed";
    imgClone.style.left = `${productRect.left}px`;
    imgClone.style.top = `${productRect.top}px`;
    imgClone.style.width = `${productRect.width / 3}px`;
    imgClone.style.height = `${productRect.height / 3}px`;
    imgClone.style.zIndex = 1000;
    imgClone.style.borderRadius = "0.5rem";
    imgClone.style.opacity = "1";
    document.body.appendChild(imgClone);

    const startX = productRect.left;
    const startY = productRect.top;
    const endX = cartRect.left + cartRect.width / 2 - productRect.width / 6;
    const endY = cartRect.top + cartRect.height / 2 - productRect.height / 6;

    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const amplitude = 25;
      const frequency = 4;
      const offsetX = Math.sin(progress * Math.PI * frequency) * amplitude;

      imgClone.style.left = `${
        startX + (endX - startX) * progress + offsetX
      }px`;
      imgClone.style.top = `${startY + (endY - startY) * progress}px`;
      imgClone.style.opacity = `${1 - progress}`;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        addToCart(product);
        document.body.removeChild(imgClone);
      }
    };

    requestAnimationFrame(animate);
  };

  // ➕➖ Atualizar quantidade
  const updateQuantity = (productId, size, color, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(newQuantity, 1) }
          : item
      )
    );
  };

  // 🗑 Remover item
  const removeFromCart = (productId, size, color) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => setCartItems([]);

  // ❤️ Wishlist
  const addToWishlist = (product) => {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
  };

  // 👤 Autenticação fake
  const loginUser = () => setIsAuthenticated(true);
  const logoutUser = () => {
    setIsAuthenticated(false);
    navigateTo("products");
  };

  // 🛒 Contagem de itens
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // 🔎 Filtros e busca
  const filteredProducts = useMemo(() => {
    let currentProducts = [...products];
    if (filterCategory !== "Todos") {
      currentProducts = currentProducts.filter(
        (p) => p.category === filterCategory
      );
    }
    if (searchTerm) {
      currentProducts = currentProducts.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    switch (sortOption) {
      case "price-asc":
        currentProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        currentProducts.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        currentProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        currentProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return currentProducts;
  }, [searchTerm, filterCategory, sortOption]);

  return (
    <ProductContext.Provider
      value={{
        currentPage,
        navigateTo,
        cartItems,
        addToCart,
        addToCartWithAnimation,
        updateQuantity,
        removeFromCart,
        clearCart,
        selectedProduct,
        setSelectedProduct,
        orderConfirmed,
        setOrderConfirmed,
        resetCheckout,
        searchTerm,
        setSearchTerm,
        filterCategory,
        setFilterCategory,
        sortOption,
        setSortOption,
        filteredProducts,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isAuthenticated,
        loginUser,
        logoutUser,
        cartItemCount,
        products,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

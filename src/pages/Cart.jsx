import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Cart = ({ darkMode }) => {
  const { cartItems, navigateTo, updateQuantity, removeFromCart } =
    useContext(ProductContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main
      className={`w-full min-h-screen transition-colors duration-500 p-6 pt-32 animate-fade-in ${
        darkMode
          ? "bg-gradient-to-b from-cyan-950 via-cyan-900 to-cyan-800"
          : "bg-gradient-to-b from-white via-cyan-50 to-white"
      }`}
    >
      <h2
        className={`text-5xl font-extrabold mb-12 text-center drop-shadow-lg animate-fade-in-down ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Seu Carrinho
      </h2>

      {cartItems.length === 0 ? (
        <div
          className={`text-center rounded-2xl p-8 shadow-lg border ${
            darkMode
              ? "bg-white/5 border-white/10 text-gray-300"
              : "bg-white border-gray-200 text-gray-700"
          }`}
        >
          <p className="text-2xl mb-6">
            Seu carrinho está vazio. Que tal adicionar alguns itens elegantes?
          </p>
          <button
            onClick={() => navigateTo("products")}
            className={`py-3 px-8 rounded-full font-medium text-lg shadow-lg transform transition-all duration-300 ${
              darkMode
                ? "bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 text-white hover:from-cyan-600 hover:via-cyan-500 hover:to-cyan-400"
                : "bg-cyan-500 text-black hover:bg-cyan-600"
            }`}
          >
            Continuar Comprando
          </button>
        </div>
      ) : (
        <div
          className={`rounded-2xl shadow-lg p-8 border ${
            darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200"
          }`}
        >
          <div className="space-y-8 mb-8">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize || "Único"}-${
                  item.selectedColor || "Padrão"
                }`}
                className={`flex flex-col sm:flex-row items-center justify-between border-b pb-6 last:border-b-0 last:pb-0 animate-fade-in-right ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <div className="flex items-center flex-grow mb-4 sm:mb-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg mr-6 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/100x100/0a0a0a/00ffaa?text=${item.name.replace(
                        /\s/g,
                        "+"
                      )}`;
                    }}
                  />
                  <div>
                    <h3
                      className={`text-2xl font-semibold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-lg ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Tamanho: {item.selectedSize || "Único"} | Cor:{" "}
                      {item.selectedColor || "Padrão"}
                    </p>
                    <p className="text-emerald-500 text-2xl font-bold drop-shadow-sm">
                      R$ {item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div
                    className={`flex items-center rounded-full overflow-hidden shadow-inner border ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize || "Único",
                          item.selectedColor || "Padrão",
                          item.quantity - 1
                        )
                      }
                      className={`px-4 py-2 text-xl font-bold transition-colors duration-200 ${
                        darkMode
                          ? "text-gray-100 hover:bg-gray-700 active:bg-gray-900"
                          : "text-gray-800 hover:bg-gray-200 active:bg-gray-300"
                      }`}
                    >
                      -
                    </button>
                    <span
                      className={`px-4 py-2 text-xl font-medium ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.selectedSize || "Único",
                          item.selectedColor || "Padrão",
                          item.quantity + 1
                        )
                      }
                      className={`px-4 py-2 text-xl font-bold transition-colors duration-200 ${
                        darkMode
                          ? "text-gray-100 hover:bg-gray-700 active:bg-gray-900"
                          : "text-gray-800 hover:bg-gray-200 active:bg-gray-300"
                      }`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      removeFromCart(
                        item.id,
                        item.selectedSize || "Único",
                        item.selectedColor || "Padrão"
                      )
                    }
                    className="text-red-500 hover:text-red-600 transition-colors duration-200 transform hover:scale-110 active:scale-95"
                    title="Remover item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`flex justify-between items-center text-3xl font-bold border-t pt-8 mt-8 ${
              darkMode
                ? "text-gray-100 border-gray-700"
                : "text-gray-900 border-gray-200"
            }`}
          >
            <span>Total:</span>
            <span className="text-emerald-500 drop-shadow-md">
              R$ {total.toFixed(2)}
            </span>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-end gap-6">
            <button
              onClick={() => navigateTo("products")}
              className={`py-4 px-8 rounded-full font-medium text-xl shadow-lg transform transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 text-white hover:from-cyan-600 hover:via-cyan-500 hover:to-cyan-400"
                  : "bg-cyan-500 text-black hover:bg-cyan-600"
              }`}
            >
              Continuar Comprando
            </button>
            <button
              onClick={() => navigateTo("checkout")}
              className={`py-4 px-8 rounded-full font-medium text-xl shadow-lg transform transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-r from-cyan-700 via-cyan-600 to-cyan-500 text-white hover:from-cyan-600 hover:via-cyan-500 hover:to-cyan-400"
                  : "bg-cyan-500 text-black hover:bg-cyan-600"
              }`}
            >
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Cart;

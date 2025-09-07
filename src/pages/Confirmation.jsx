import React, { useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Confirmation = () => {
  const { navigateTo, clearCart, orderConfirmed } = useContext(ProductContext);

  useEffect(() => {
    if (orderConfirmed) {
      clearCart();
    }
  }, [orderConfirmed, clearCart]);

  if (!orderConfirmed) {
    return (
      <div className="container mx-auto p-6 text-black text-center">
        <p className="text-xl mb-4">Nenhum pedido foi confirmado.</p>
        <button
          onClick={() => navigateTo("products")}
          className="bg-white border-2 border-cyan-500 text-black py-3 px-6 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-300 font-medium shadow-md hover:shadow-cyan-300/50 transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
        >
          Voltar para Produtos
        </button>
      </div>
    );
  }

  const orderNumber = Math.floor(Math.random() * 10000000) + 100000;

  return (
    <main className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-3xl p-10 max-w-2xl w-full border border-gray-300 text-black text-center animate-fade-in-up">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-cyan-500 mx-auto mb-8 animate-bounce-once drop-shadow-lg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h2 className="text-5xl font-extrabold text-black mb-4 drop-shadow-sm animate-fade-in-down">
          Pedido Confirmado!
        </h2>
        <p className="text-black text-xl mb-6 leading-relaxed">
          Obrigado pela sua compra! Seu pedido foi processado com sucesso e está
          a caminho.
        </p>
        <p className="text-black text-2xl font-semibold mb-8">
          Número do Pedido:{" "}
          <span className="text-cyan-500 drop-shadow-sm">#{orderNumber}</span>
        </p>
        <button
          onClick={() => navigateTo("products")}
          className="bg-white border-2 border-cyan-500 text-black py-4 px-10 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 ease-in-out font-medium text-xl shadow-md hover:shadow-cyan-300/50 transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
        >
          Continuar Comprando
        </button>
      </div>
    </main>
  );
};

export default Confirmation;

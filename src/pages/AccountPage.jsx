import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const AccountPage = () => {
  const { navigateTo } = useContext(ProductContext);

  return (
    <main className="container mx-auto p-6 pt-32 animate-fade-in">
      <div className="bg-white rounded-xl shadow-lg p-10 max-w-2xl mx-auto border border-gray-200">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-sm animate-fade-in-down">
          Bem-vindo(a), <span className="text-emerald-500">Usuário!</span>
        </h2>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Esta é a sua página de conta. Aqui você pode gerenciar suas
          informações e pedidos.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <button
            onClick={() => navigateTo("wishlist")}
            className="bg-gray-200 text-gray-800 py-4 px-8 rounded-full hover:bg-gray-300 transition-all duration-300 ease-in-out font-medium text-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
          >
            Minha Lista de Desejos
          </button>
          <button
            onClick={() =>
              alert("Funcionalidade de Histórico de Pedidos em breve!")
            }
            className="bg-gray-200 text-gray-800 py-4 px-8 rounded-full hover:bg-gray-300 transition-all duration-300 ease-in-out font-medium text-lg shadow-sm hover:shadow-md transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
          >
            Histórico de Pedidos
          </button>
        </div>
        <button
          onClick={() => navigateTo("products")}
          className="mt-8 bg-emerald-500 text-white py-4 px-10 rounded-full hover:bg-emerald-600 transition-all duration-300 ease-in-out font-medium text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
        >
          Voltar para a Loja
        </button>
      </div>
    </main>
  );
};

export default AccountPage;

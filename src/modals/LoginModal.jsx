import React, { useState } from "react";

const LoginModal = ({ onClose, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Login button clicked!");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex justify-center mb-4">
          <img
            src="src/assets/zc.png"
            alt="Logo da Zark"
            className="w-25 h-24 rounded-full"
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Faça login na Zark
        </h2>
        <p className="text-center text-gray-600 mt-2 mb-8">
          Sua moda começa aqui na ZC! ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pt-5 pb-2 text-gray-800 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-cyan-500/90 transition-colors peer"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-4 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-xs peer-valid:top-1.5 peer-valid:text-xs"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pt-5 pb-2 text-gray-800 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-cyan-500/90 transition-colors peer"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-4 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-xs peer-valid:top-1.5 peer-valid:text-xs"
            >
              Senha
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg text-black font-bold text-lg bg-cyan-500/90 hover:bg-cyan-400/90 transition-colors"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center text-gray-800 mt-6 text-sm">
          Não tem uma conta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-cyan-500/90 hover:underline transition-colors font-bold"
          >
            Criar agora
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;

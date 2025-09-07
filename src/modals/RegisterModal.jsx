import React, { useState } from "react";

const RegisterModal = ({ onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido.";
    if (!formData.password.trim()) newErrors.password = "Senha é obrigatória.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "As senhas não coincidem.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setMessage("Cadastro simulado com sucesso!");
      setTimeout(onClose, 1000);
    } else {
      setMessage("Por favor, corrija os erros acima.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 relative">
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

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Cadastrar na Zark
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Crie sua conta e comece sua moda! ✨
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder=" "
              className="w-full p-3 pt-5 pb-2 text-gray-800 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#00FFFF] transition-colors peer"
              required
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-4 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-xs peer-valid:top-1.5 peer-valid:text-xs"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" "
              className="w-full p-3 pt-5 pb-2 text-gray-800 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#00FFFF] transition-colors peer"
              required
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-4 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-xs peer-valid:top-1.5 peer-valid:text-xs"
            >
              Senha
            </label>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="relative">
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder=" "
              className="w-full p-3 pt-5 pb-2 text-gray-800 border-b-2 border-gray-300 bg-transparent focus:outline-none focus:border-[#00FFFF] transition-colors peer"
              required
            />
            <label
              htmlFor="confirmPassword"
              className="absolute left-3 top-4 text-gray-500 text-sm transform transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:top-1.5 peer-focus:text-xs peer-valid:top-1.5 peer-valid:text-xs"
            >
              Confirmar Senha
            </label>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {message && (
            <p
              className={`text-center text-lg ${
                message.includes("sucesso") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 rounded-lg text-white font-bold text-lg bg-[#2EEAEA] hover:bg-[#00FFFF] transition-colors"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          Já tem uma conta?{" "}
          <button
            onClick={onSwitchToLogin}
            className="text-[#00FFFF] hover:underline transition-colors font-bold"
          >
            Entrar
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterModal;

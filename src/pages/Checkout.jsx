import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Checkout = () => {
  const { cartItems, navigateTo, setOrderConfirmed } =
    useContext(ProductContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    paymentMethod: "creditCard",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCepChange = async (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, cep }));

    if (cep.length === 8) {
      setMessage("Buscando CEP...");
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          setMessage("CEP não encontrado.");
          setFormData((prev) => ({
            ...prev,
            address: "",
            neighborhood: "",
            city: "",
            state: "",
          }));
        } else {
          setFormData((prev) => ({
            ...prev,
            address: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf,
          }));
          setMessage("CEP encontrado!");
        }
      } catch (error) {
        setMessage("Erro ao buscar CEP.");
        console.error("Erro ao buscar CEP:", error);
      } finally {
        setTimeout(() => setMessage(""), 2000);
      }
    } else setMessage("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório.";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email inválido.";
    if (!formData.cep.trim()) newErrors.cep = "CEP é obrigatório.";
    if (!formData.address.trim()) newErrors.address = "Endereço é obrigatório.";
    if (!formData.number.trim()) newErrors.number = "Número é obrigatório.";
    if (!formData.neighborhood.trim())
      newErrors.neighborhood = "Bairro é obrigatório.";
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória.";
    if (!formData.state.trim()) newErrors.state = "Estado é obrigatório.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setMessage("Processando seu pedido...");
      setTimeout(() => {
        setIsSubmitting(false);
        setOrderConfirmed(true);
        navigateTo("confirmation");
      }, 2000);
    } else setMessage("Por favor, preencha todos os campos obrigatórios.");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-6 text-gray-100 text-center">
        <p className="text-xl mb-4">
          Seu carrinho está vazio. Adicione produtos antes de finalizar a
          compra.
        </p>
        <button
          onClick={() => navigateTo("products")}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-lg hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 font-medium shadow-lg hover:shadow-emerald-500/40 transform hover:-translate-y-1 active:translate-y-0 active:shadow-sm"
        >
          Voltar para Produtos
        </button>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-8 animate-fade-in mt-10">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-100 mb-6 text-center drop-shadow-lg">
        Finalizar Compra
      </h2>

      <button
        type="button"
        onClick={() => navigateTo("productDetail")}
        className="mb-4 bg-cyan-400 text-black py-2 px-4 rounded-lg hover:bg-cyan-500 transition-all duration-300 font-medium shadow-md"
      >
        ← Voltar para Detalhes
      </button>

      <div className="bg-gray-100 rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col lg:flex-row gap-6 border border-gray-300">
        <div className="flex-1">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-cyan-700">
            Informações de Entrega e Pagamento
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {[
              "name",
              "email",
              "cep",
              "address",
              "number",
              "complement",
              "neighborhood",
              "city",
              "state",
            ].map((field) => (
              <div key={field}>
                <label className="block text-black font-semibold text-sm mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  readOnly={[
                    "address",
                    "neighborhood",
                    "city",
                    "state",
                  ].includes(field)}
                  className={`w-full p-2 sm:p-3 bg-white border border-cyan-400 rounded-md text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner transition-colors ${
                    errors[field] ? "border-red-500" : "border-cyan-400"
                  }`}
                  placeholder={field}
                  maxLength={field === "cep" ? 8 : undefined}
                />
                {errors[field] && (
                  <p className="text-red-500 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-black font-semibold text-sm mb-1">
                Método de Pagamento
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 bg-white border border-cyan-400 rounded-md text-black text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-inner transition-colors"
              >
                <option value="creditCard">Cartão de Crédito</option>
                <option value="boleto">Boleto Bancário</option>
                <option value="pix">PIX</option>
              </select>
            </div>

            {message && (
              <p
                className={`text-center text-sm ${
                  isSubmitting ? "text-cyan-700 animate-pulse" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-cyan-400 text-black py-3 sm:py-4 rounded-lg hover:bg-cyan-500 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-cyan-300/50 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processando..." : "Confirmar Pedido"}
            </button>
          </form>
        </div>

        <div className="lg:w-1/3 bg-white bg-opacity-95 rounded-2xl p-4 sm:p-6 shadow-xl text-black border border-cyan-300 flex flex-col gap-4">
          <h3 className="text-2xl sm:text-3xl font-semibold text-cyan-700 mb-4">
            Resumo do Pedido
          </h3>
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
              className="bg-white rounded-lg p-3 border border-cyan-300 flex flex-col gap-2 text-sm"
            >
              <img
                src={
                  item.image ||
                  "https://via.placeholder.com/100x100?text=Sem+Imagem"
                }
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg self-center"
              />
              <p className="font-bold text-black text-center">{item.name}</p>
              <p className="text-gray-600 text-center">
                Tamanho: <span className="text-black">{item.selectedSize}</span>
              </p>
              <p className="text-gray-600 text-center">
                Cor: <span className="text-black">{item.selectedColor}</span>
              </p>
              <p className="text-gray-600 text-center">
                Quantidade: <span className="text-black">{item.quantity}</span>
              </p>
              {item.specificRequest && (
                <div className="mt-1 p-2 bg-white border border-cyan-400 rounded-md text-center text-xs">
                  <p className="text-cyan-700 font-semibold">
                    Pedido específico:
                  </p>
                  <p className="text-black mt-1">
                    {item.specificRequestText} <br />
                    Tamanho: {item.selectedSize} <br />
                    Cor: {item.selectedColor} <br />
                    Valor: R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div className="mt-4 pt-2 border-t border-cyan-300 flex justify-between items-center text-xl sm:text-2xl font-bold">
            <span>Total:</span>
            <span className="text-cyan-700 drop-shadow-md">
              R$ {total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;

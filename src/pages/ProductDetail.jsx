import React, { useState, useEffect, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import reviews from "../data/reviewsData";

const ProductDetail = () => {
  const { selectedProduct, navigateTo, addToCart } = useContext(ProductContext);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [zoom, setZoom] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [videoOpenId, setVideoOpenId] = useState(null);
  const [customColorRequest, setCustomColorRequest] = useState("");

  const colorPrices = { "Verde Neon": 399.99 };
  const handleNavigate = (page) => {
    setCustomColorRequest("");
    navigateTo(page);
  };

  useEffect(() => setCustomColorRequest(""), [selectedProduct]);
  useEffect(() => window.scrollTo(0, 0), [selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedSize(selectedProduct.sizes?.[0] || "");
      setSelectedColor(selectedProduct.colors?.[0] || "");
      const firstImage =
        selectedProduct.colorImages?.[selectedProduct.colors?.[0]] ||
        selectedProduct.image ||
        "https://via.placeholder.com/300x300?text=Sem+Imagem";
      setMainImage(firstImage);
      setZoomIndex(0);
      setVideoOpenId(null);
    }
  }, [selectedProduct]);

  const imagesArray = selectedProduct
    ? [
        ...(selectedProduct.colorImages
          ? Object.values(selectedProduct.colorImages)
          : []),
        selectedProduct.image,
      ].filter(Boolean)
    : ["https://via.placeholder.com/300x300?text=Sem+Imagem"];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    const priceToUse = colorPrices[selectedColor] || selectedProduct.price;
    addToCart(
      { ...selectedProduct, price: priceToUse },
      selectedSize,
      selectedColor
    );
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) return;
    const priceToUse = colorPrices[selectedColor] || selectedProduct.price;
    addToCart(
      { ...selectedProduct, price: priceToUse },
      selectedSize,
      selectedColor
    );
    navigateTo("checkout");
  };

  const handleSpecificRequest = () => {
    if (!customColorRequest) return;
    const specificItem = {
      ...selectedProduct,
      name: `${selectedProduct.name} (Cor Personalizada)`,
      color: customColorRequest,
      specificRequest: true,
      price: selectedProduct.price,
    };
    addToCart(specificItem, selectedSize, customColorRequest);
    navigateTo("checkout");
  };

  const changeColor = (color) => {
    setSelectedColor(color);
    setCustomColorRequest("");
    const newImage =
      selectedProduct.colorImages?.[color] ||
      selectedProduct.image ||
      "https://via.placeholder.com/300x300?text=Sem+Imagem";
    setMainImage(newImage);
    setZoomIndex(imagesArray.indexOf(newImage) || 0);
  };

  const nextImage = () => {
    const nextIndex = (zoomIndex + 1) % imagesArray.length;
    setZoomIndex(nextIndex);
    setMainImage(imagesArray[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = zoomIndex === 0 ? imagesArray.length - 1 : zoomIndex - 1;
    setZoomIndex(prevIndex);
    setMainImage(imagesArray[prevIndex]);
  };

  if (!selectedProduct) {
    return (
      <div className="container mx-auto p-6 text-black text-center">
        <p className="text-xl">
          Produto não selecionado.{" "}
          <button
            onClick={() => navigateTo("products")}
            className="text-cyan-500 hover:underline"
          >
            Voltar aos produtos
          </button>
        </p>
      </div>
    );
  }

  const displayedPrice = colorPrices[selectedColor] || selectedProduct.price;

  return (
    <main className="container mx-auto p-4 pt-12 animate-fade-in relative">
      <button
        onClick={() => handleNavigate("products")}
        className="mb-6 px-3 py-1.5 bg-white text-black border-2 border-cyan-500 rounded-full hover:bg-cyan-500 hover:text-white transition-all duration-300 shadow-md"
      >
        Voltar para Produtos
      </button>

      <div className="flex flex-wrap gap-8 justify-start">
        <div className="flex-1 min-w-[200px] max-w-[400px] flex justify-center">
          <img
            src={mainImage}
            alt={selectedProduct.name}
            className="w-full h-auto object-cover rounded-lg shadow-md cursor-zoom-in transition-transform duration-300"
            onClick={() => setZoom(!zoom)}
          />
          {zoom && (
            <div
              onClick={() => setZoom(false)}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out p-4"
            >
              <div className="relative max-w-[90vw] max-h-[90vh]">
                <img
                  src={mainImage}
                  alt="Zoom"
                  className="w-full h-full object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                  ◀
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full hover:bg-black/70 transition"
                >
                  ▶
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-[200px] max-w-[450px] flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-white">
            {selectedProduct.name}
          </h2>
          <p className="text-xl font-semibold text-white">
            R$ {displayedPrice.toFixed(2)}
          </p>

          <div>
            <p className="text-black text-sm mb-1">white:</p>
            <div className="flex flex-wrap gap-2">
              {selectedProduct.colors?.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => changeColor(color)}
                  className={`flex items-center gap-1.5 p-1 rounded-lg border-2 transition-all duration-300 ${
                    selectedColor === color
                      ? "border-cyan-500 bg-white"
                      : "border-gray-300 bg-white"
                  } hover:scale-105`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300 shadow">
                    <img
                      src={
                        selectedProduct.colorImages?.[color] ||
                        selectedProduct.image
                      }
                      alt={color}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-black font-medium text-xs">
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-32 p-2 bg-white border-2 border-cyan-500 rounded-md text-black text-sm focus:ring-2 focus:ring-cyan-500"
          >
            {selectedProduct.sizes?.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-3 mt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 min-w-[120px] bg-cyan-500 text-black py-2 text-sm rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              Adicionar
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 min-w-[120px] bg-cyan-500 text-black py-2 text-sm rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-white border-2 border-[#0aa3c1] rounded-lg flex flex-col gap-4">
        <div className="flex flex-wrap gap-3 items-start">
          <div className="flex-1 min-w-[180px]">
            <h3 className="text-lg font-bold text-black mb-1">
              Pedido Específico
            </h3>
            <p className="text-black text-sm mb-1">
              Não encontrou a cor que queria? Peça uma cor personalizada.
            </p>
            <input
              type="text"
              placeholder="Digite a cor desejada"
              value={customColorRequest}
              onChange={(e) => setCustomColorRequest(e.target.value)}
              className="w-full p-2 bg-white border-2 border-[#0aa3c1] rounded-md text-black text-sm focus:ring-2 focus:ring-[#0aa3c1]"
            />
          </div>
          <button
            onClick={handleSpecificRequest}
            className="flex-1 min-w-[120px] bg-[#0aa3c1] text-black py-2 text-sm rounded-lg font-bold transition-all duration-300 transform hover:scale-105 self-end"
          >
            Pedido
          </button>
        </div>

        {selectedProduct.longDescription && (
          <div className="mt-3 p-3 border-2 border-[#0aa3c1] rounded-md bg-white shadow-sm">
            <h4 className="text-black font-semibold text-sm mb-1">
              Descrição do Produto
            </h4>
            <p className="text-black text-sm leading-relaxed whitespace-pre-line">
              {selectedProduct.longDescription}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">Avaliações ✨</h3>
        <div className="flex flex-wrap gap-3">
          {reviews.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg p-3 shadow-md flex-1 min-w-[180px] max-w-[250px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={
                    review.photo ||
                    "https://png.pngtree.com/thumb_back/fh260/background/20220818/pngtree-round-stamp-icon-with-cobalt-and-cyan-colors-for-user-profile-photo-image_19582402.jpg"
                  }
                  alt={review.name}
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <p className="font-semibold text-black text-sm">
                  {review.name}
                </p>
              </div>
              <p className="text-black text-sm">{review.text}</p>
              {review.videoUrl && (
                <video
                  src={review.videoUrl}
                  className="w-full h-24 rounded-md object-cover mt-2"
                  controls
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={() => navigateTo("reviews")}
          className="mt-3 px-4 py-1.5 bg-cyan-500 text-black rounded-full font-semibold hover:scale-105 transition"
        >
          Ver mais avaliações
        </button>
      </div>
    </main>
  );
};

export default ProductDetail;

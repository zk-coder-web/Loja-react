import React, { useState } from "react";
import reviewsData from "../data/reviewcomplete";

const LikeIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={active ? "#00ffff" : "none"}
    stroke="#00ffff"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{
      filter: active ? "drop-shadow(0 0 8px #00ffff)" : "none",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
  >
    <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32a1 1 0 0 0-.29-.7L14.17 2 7.59 8.59C7.21 8.95 7 9.45 7 10v9a2 2 0 0 0 2 2h7c.83 0 1.54-.5 1.84-1.22L23 12.17V10z" />
  </svg>
);

const DislikeIcon = ({ active }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={active ? "#00ffff" : "none"}
    stroke="#00ffff"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    style={{
      filter: active ? "drop-shadow(0 0 8px #00ffff)" : "none",
      transition: "all 0.3s ease",
      cursor: "pointer",
    }}
  >
    <path d="M23 3h-4v12h4V3zM1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32a1 1 0 0 0 .29.7l1.42 1.42 6.58-6.59c.38-.36.59-.86.59-1.41v-9a2 2 0 0 0-2-2H9c-.83 0-1.54.5-1.84 1.22L1 11.83V14z" />
  </svg>
);

const ReviewsPage = () => {
  const initialLikes = [32, 23, 10, 5, 3, 2, 2];
  const initialDislikes = [2, 1, 0, 0, 0, 0, 0];

  const [reviews, setReviews] = useState(
    reviewsData.map((r, i) => ({
      ...r,
      likes: initialLikes[i] ?? 0,
      dislikes: initialDislikes[i] ?? 0,
      userAction: null,
    }))
  );
  const [filter, setFilter] = useState("all");
  const [zoomMedia, setZoomMedia] = useState(null);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            i <= count ? "text-cyan-500/90" : "text-gray-400"
          }`}
          fill={i <= count ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: i <= count ? "drop-shadow(0 0 2px #00ffff)" : "none",
          }}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
    return stars;
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "comment")
      return review.text && !review.photoUrl && !review.videoUrl;
    if (filter === "media") return review.photoUrl || review.videoUrl;
    return true;
  });

  const toggleZoom = (id, type, src) => {
    if (zoomMedia && zoomMedia.id === id) setZoomMedia(null);
    else setZoomMedia({ id, type, src });
  };

  const handleLike = (id) =>
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (r.userAction === "like")
            return { ...r, likes: r.likes - 1, userAction: null };
          if (r.userAction === "dislike")
            return {
              ...r,
              dislikes: r.dislikes - 1,
              likes: r.likes + 1,
              userAction: "like",
            };
          return { ...r, likes: r.likes + 1, userAction: "like" };
        }
        return r;
      })
    );

  const handleDislike = (id) =>
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          if (r.userAction === "dislike")
            return { ...r, dislikes: r.dislikes - 1, userAction: null };
          if (r.userAction === "like")
            return {
              ...r,
              likes: r.likes - 1,
              dislikes: r.dislikes + 1,
              userAction: "dislike",
            };
          return { ...r, dislikes: r.dislikes + 1, userAction: "dislike" };
        }
        return r;
      })
    );

  return (
    <main className="w-full min-h-screen p-6 pt-32 pb-12 bg-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-cyan-500/90">
        Avaliações de Clientes
      </h1>

      <div className="mb-8 flex gap-4 flex-wrap justify-center">
        {["all", "comment", "media"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === f
                ? "bg-cyan-500/90 text-white"
                : "bg-gray-100 text-cyan-500/90 hover:bg-cyan-200"
            }`}
          >
            {f === "all"
              ? "Mostrar tudo"
              : f === "comment"
              ? "Com comentário"
              : "Com mídia"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {filteredReviews.length === 0 && (
          <p className="text-gray-400 text-center">
            Nenhuma avaliação encontrada.
          </p>
        )}

        {filteredReviews.map(
          ({
            id,
            name,
            stars,
            date,
            text,
            photoUrl,
            videoUrl,
            likes,
            dislikes,
            userAction,
          }) => (
            <div
              key={id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-cyan-500/50 transition-shadow break-words"
            >
              <div className="flex justify-between items-center mb-1 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <img
                    src="https://png.pngtree.com/thumb_back/fh260/background/20220818/pngtree-round-stamp-icon-with-cobalt-and-cyan-colors-for-user-profile-photo-image_19582402.jpg"
                    alt="Foto do perfil"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <h2 className="text-lg font-semibold text-black">{name}</h2>
                </div>
                <span className="text-xs text-gray-400">{date}</span>
              </div>

              <div className="flex space-x-1 mb-2">{renderStars(stars)}</div>

              {text && <p className="text-black mb-2 leading-snug">{text}</p>}

              {(photoUrl || videoUrl) && (
                <div className="flex gap-4 flex-wrap mb-4">
                  {photoUrl && (
                    <img
                      src={photoUrl}
                      alt={`Foto do comentário de ${name}`}
                      className="w-32 h-32 rounded-lg shadow-md object-cover cursor-pointer hover:scale-105 transition-transform"
                      onClick={() => toggleZoom(id, "photo", photoUrl)}
                    />
                  )}
                  {videoUrl && (
                    <div
                      onClick={() => toggleZoom(id, "video", videoUrl)}
                      className="relative w-32 h-32 rounded-lg shadow-md cursor-pointer overflow-hidden hover:scale-105 transition-transform"
                    >
                      <video
                        src={videoUrl}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-32 h-32 rounded-lg object-cover cursor-pointer"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-cyan-500/90 drop-shadow-lg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center gap-6">
                <div
                  className="flex items-center gap-1 select-none"
                  onClick={() => handleLike(id)}
                >
                  <LikeIcon active={userAction === "like"} />
                  <span className="text-cyan-500/90 font-semibold">
                    {likes}
                  </span>
                </div>

                <div
                  className="flex items-center gap-1 select-none"
                  onClick={() => handleDislike(id)}
                >
                  <DislikeIcon active={userAction === "dislike"} />
                  <span className="text-cyan-500/90 font-semibold">
                    {dislikes}
                  </span>
                </div>
              </div>

              {zoomMedia && zoomMedia.id === id && (
                <div className="mt-4 rounded-lg shadow-lg bg-white p-4">
                  {zoomMedia.type === "video" ? (
                    <video
                      src={zoomMedia.src}
                      controls
                      autoPlay
                      className="w-full rounded-lg max-h-[480px] object-contain"
                    />
                  ) : (
                    <img
                      src={zoomMedia.src}
                      alt="Mídia ampliada"
                      className="w-full rounded-lg max-h-[480px] object-contain"
                    />
                  )}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </main>
  );
};

export default ReviewsPage;

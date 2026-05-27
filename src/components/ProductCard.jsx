import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user, toggleFavorite, isFavorite } = useAuth();
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [ripple, setRipple] = useState(false);

  const { id, name, price, originalPrice, image, category, rating, reviews, badge } = product;

  const favorited = isFavorite?.(id);
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product);
    setAddedFeedback(true);
    setRipple(true);
    setTimeout(() => setAddedFeedback(false), 1800);
    setTimeout(() => setRipple(false), 600);
  };

  const handleFavorite = () => {
    if (!user) return alert("Please sign in to save favorites.");
    toggleFavorite(product);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(rating ?? 0));

  return (
    <article className="relative bg-white rounded-2xl overflow-hidden shadow-md flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group font-sans">

      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">

        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 z-10 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            {badge}
          </span>
        )}

        {/* Discount */}
        {discount && (
          <span className="absolute top-3 right-12 z-10 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}

        {/* Product Image */}
        <img
          src={image || `https://placehold.co/420x420/1a1a2e/e0e0e0?text=${encodeURIComponent(name)}`}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Overlay with Quick Add */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200
              ${addedFeedback
                ? "bg-green-500 text-white"
                : "bg-white text-gray-900 hover:bg-gray-900 hover:text-white"
              } ${ripple ? "scale-110" : "scale-100"}`}
          >
            {addedFeedback ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 z-20 w-9 h-9 rounded-full border-none flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all duration-200 hover:scale-110
            ${favorited
              ? "bg-white text-red-500"
              : "bg-white/90 text-gray-300 hover:bg-white hover:text-red-400"
            }`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-1.5 p-4 flex-1">

        {/* Category */}
        {category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {category}
          </span>
        )}

        {/* Product Name */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug line-clamp-2 m-0">
          {name}
        </h3>

        {/* Star Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {stars.map((filled, i) => (
                <svg key={i} width="13" height="13" viewBox="0 0 24 24"
                  fill={filled ? "#f5a623" : "none"} stroke="#f5a623" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-gray-400">({reviews ?? 0})</span>
          </div>
        )}

        {/* Price Row */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-xl font-extrabold text-gray-900 tracking-tight">
            ${price?.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-300 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <div className="mt-auto pt-3">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 rounded-xl text-sm font-bold tracking-wide border-2 transition-all duration-200 cursor-pointer
              ${addedFeedback
                ? "bg-green-500 border-green-500 text-white"
                : "bg-transparent border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
              }`}
          >
            {addedFeedback ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
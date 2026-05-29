import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const { user, favorites } = useAuth();

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Sign in to see your favorites
          </h2>
          <p className="text-sm text-gray-400">
            Save products you love by signing in to your account.
          </p>
          <Link
            to="/auth"
            className="mt-2 px-7 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition-all duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-1">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ef4444" stroke="#ef4444" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Favorites
              <span className="text-lg font-medium text-gray-300 ml-2">
                ({favorites.length})
              </span>
            </h1>
          </div>
          <p className="text-sm text-gray-400">
            Items you've saved to revisit later.
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#e5e7eb" strokeWidth="1.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <h3 className="text-xl font-extrabold text-gray-900">
              No favorites yet
            </h3>
            <p className="text-sm text-gray-400">
              Tap the ♡ on any product to save it here.
            </p>
            <Link
              to="/"
              className="mt-2 px-7 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Favorites;
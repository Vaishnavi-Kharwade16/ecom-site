import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CATEGORIES = ["Accessories", "Electronics", "Home", "Kitchen", "Apparel", "Sports", "Books", "Beauty", "Footwear"];

const INITIAL = {
  name: "", price: "", originalPrice: "", category: "",
  image: "", rating: "", reviews: "", badge: "", description: "",
};

const AdminInsert = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4 text-center px-6">
        <span className="text-6xl">🔒</span>
        <h2 className="text-2xl font-extrabold text-gray-900">Access Denied</h2>
        <p className="text-gray-500 text-sm">You must be an admin to access this page.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-2 px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition-all duration-200"
        >
          Go Home
        </button>
      </div>
    );
  }

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Product name is required.";
    if (!form.price || isNaN(+form.price) || +form.price <= 0) errs.price = "Valid price required.";
    if (!form.category) errs.category = "Category is required.";
    if (form.originalPrice && (isNaN(+form.originalPrice) || +form.originalPrice < +form.price))
      errs.originalPrice = "Original price must be >= sale price.";
    if (form.rating && (isNaN(+form.rating) || +form.rating < 0 || +form.rating > 5))
      errs.rating = "Rating must be 0–5.";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true); setErrors({});

    await new Promise((r) => setTimeout(r, 700));

    const product = {
      id: Date.now().toString(),
      name: form.name,
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : null,
      category: form.category,
      image: form.image || null,
      rating: form.rating ? parseFloat(form.rating) : null,
      reviews: form.reviews ? parseInt(form.reviews) : 0,
      badge: form.badge || null,
      description: form.description,
    };

    const existing = JSON.parse(localStorage.getItem("ec_products") || "[]");
    localStorage.setItem("ec_products", JSON.stringify([...existing, product]));

    setSuccess(`"${product.name}" added successfully!`);
    setForm(INITIAL);
    setLoading(false);
   setTimeout(() => {
      window.location.href = "/";
  }, 1000);
  };

  const inputClass = (err) =>
    `w-full px-4 py-3 border rounded-xl text-sm text-gray-900 bg-white outline-none transition-all duration-200 focus:ring-2 focus:ring-gray-900/10 placeholder:text-gray-400
    ${err ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-gray-900"}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-16 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-3">
            Admin Panel
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Add New Product
          </h1>
          <p className="text-sm text-gray-400">
            Fill out the form below to add a product to the store catalog.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm font-semibold px-4 py-3 rounded-xl mb-6">
            ✓ {success}
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

            {/* Basic Info */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300 border-b border-gray-100 pb-2">
              Basic Info
            </p>

            {/* Name + Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Product Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Minimal Leather Watch"
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass(errors.name)}
                />
                {errors.name && <span className="text-xs text-red-500 font-semibold">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={update("category")}
                  className={inputClass(errors.category)}
                >
                  <option value="">Select category…</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <span className="text-xs text-red-500 font-semibold">{errors.category}</span>}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={3}
                placeholder="Brief product description…"
                value={form.description}
                onChange={update("description")}
                className={inputClass(false) + " resize-none"}
              />
            </div>

            {/* Pricing */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300 border-b border-gray-100 pb-2">
              Pricing
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Sale Price ($) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="29.99"
                  value={form.price}
                  onChange={update("price")}
                  className={inputClass(errors.price)}
                />
                {errors.price && <span className="text-xs text-red-500 font-semibold">{errors.price}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Leave blank if no discount"
                  value={form.originalPrice}
                  onChange={update("originalPrice")}
                  className={inputClass(errors.originalPrice)}
                />
                {errors.originalPrice && <span className="text-xs text-red-500 font-semibold">{errors.originalPrice}</span>}
              </div>
            </div>

            {/* Media & Meta */}
            <p className="text-xs font-bold uppercase tracking-widest text-gray-300 border-b border-gray-100 pb-2">
              Media & Meta
            </p>

            {/* Image URL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Image URL
              </label>
              <input
                type="url"
                placeholder="https://example.com/product.jpg"
                value={form.image}
                onChange={update("image")}
                className={inputClass(false)}
              />
            </div>

            {/* Image Preview */}
            {form.image && (
              <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4">
                <p className="text-xs text-gray-400 font-semibold mb-3">Image Preview</p>
                <img
                  src={form.image}
                  alt="preview"
                  className="w-36 h-36 object-cover rounded-xl"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            )}

            {/* Rating + Reviews + Badge */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Rating (0–5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  value={form.rating}
                  onChange={update("rating")}
                  className={inputClass(errors.rating)}
                />
                {errors.rating && <span className="text-xs text-red-500 font-semibold">{errors.rating}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Review Count
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="128"
                  value={form.reviews}
                  onChange={update("reviews")}
                  className={inputClass(false)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Badge
                </label>
                <input
                  type="text"
                  placeholder="New / Sale / Popular"
                  value={form.badge}
                  onChange={update("badge")}
                  className={inputClass(false)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setForm(INITIAL); setErrors({}); }}
                className="px-6 py-3 border border-gray-200 text-gray-500 rounded-xl text-sm font-semibold hover:border-gray-400 hover:text-gray-700 transition-all duration-200"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed min-w-[140px] justify-center"
              >
                {loading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    Add Product
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminInsert;
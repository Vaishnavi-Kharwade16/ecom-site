import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  image: "",
  rating: "",
  reviews: "",
  badge: "",
};

const InsertProduct = () => {
  const { isAdmin, token } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/auth", { replace: true });
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...formData,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          rating: Number(formData.rating) || 0,
          reviews: Number(formData.reviews) || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStatus({ type: "success", message: "Product added successfully." });
      setFormData(initialForm);
      setSaving(false);
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setStatus({ type: "error", message: err.response?.data?.error || "Failed to save product." });
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insert New Product</h1>
            <p className="mt-2 text-sm text-gray-500">
              Fill the form and save the product to MongoDB. It will appear on the home page.
            </p>
          </div>
          <Link
            to="/"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-700 transition"
          >
            Back to Home
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-6 bg-white p-8 rounded-3xl shadow-lg">
          {status && (
            <div className={`rounded-xl px-4 py-3 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {status.message}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Name</span>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="Minimal Leather Watch"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Category</span>
              <input
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="Accessories"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Price</span>
              <input
                required
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="189.99"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Original Price</span>
              <input
                name="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="249.99"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Image URL</span>
              <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="/src/assets/watch.jpg or image URL"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Rating</span>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="4"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Reviews</span>
              <input
                name="reviews"
                type="number"
                min="0"
                value={formData.reviews}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="128"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-gray-700">Badge</span>
              <input
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                placeholder="Bestseller"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center rounded-2xl bg-gray-900 px-6 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InsertProduct;

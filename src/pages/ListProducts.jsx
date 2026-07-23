import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  category: "",
  price: "",
  originalPrice: "",
  image: "",
  rating: "",
  reviews: "",
  badge: "",
};

const ListProducts = () => {
  const { isAdmin, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin === false) {
      navigate("/auth", { replace: true });
    }
  }, [isAdmin, navigate]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get`${import.meta.env.VITE_API_URL}`;
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Unable to load products." });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (product) => {
    setEditing(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      image: product.image || "",
      rating: product.rating ?? "",
      reviews: product.reviews ?? "",
      badge: product.badge || "",
    });
    setStatus(null);
  };

  const cancelEdit = () => {
    setEditing(null);
    setFormData(initialForm);
    setStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editing) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${editing._id}`,
        {
          ...formData,
          price: Number(formData.price),
          originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
          rating: Number(formData.rating) || 0,
          reviews: Number(formData.reviews) || 0,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus({ type: "success", message: "Product updated successfully." });
      setEditing(null);
      fetchProducts();
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Unable to update product.",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus({ type: "success", message: "Product deleted successfully." });
      fetchProducts();
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Unable to delete product.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Products</h1>
            <p className="mt-2 text-sm text-gray-500">Update or remove products from the store catalog.</p>
          </div>
          <button
            onClick={() => navigate("/admin/insert-product")}
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Insert Product
          </button>
        </div>

        {status && (
          <div className={`rounded-xl px-4 py-3 mb-6 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {status.message}
          </div>
        )}

        {editing && (
          <form onSubmit={handleUpdate} className="mb-8 space-y-6 rounded-3xl bg-white p-6 shadow-md">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Name</span>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
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
                />
              </label>
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
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Reviews</span>
                <input
                  name="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Badge</span>
                <input
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Image URL</span>
                <input
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Reviews</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${product.price?.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.rating ?? 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.reviews ?? 0}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 space-x-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="rounded-full bg-red-600 px-3 py-1 text-white hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListProducts;

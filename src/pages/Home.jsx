import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Slideshow />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          {isAdmin && (
            <Link
              to="/insert-product"
              className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
            >
              Add New Product
            </Link>
          )}
        </div>
        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available</p>
        )}
      </section>
    </div>
  );
};

export default Home;
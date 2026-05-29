import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Slideshow from "../components/Slideshow";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);

 useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("ec_products") || "[]");
    
    const staticIds = products.map((p) => p.id);
    
    const newProducts = savedProducts.filter((p) => !staticIds.includes(p.id));
    
    setAllProducts([...products, ...newProducts]);
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Slideshow />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8"> Featured Products </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
      </section>
    </div>
  );
};

export default Home;
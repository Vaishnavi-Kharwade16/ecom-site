// import { BrowserRouter } from "react-router-dom";
// import { CartProvider } from "./context/CartContext";
// import { AuthProvider } from "./context/AuthContext";
// import ProductCard from "./components/ProductCard";

// const products = [
//   {
//     id: "1",
//     name: "Minimal Leather Watch",
//     price: 189.99,
//     originalPrice: 249.99,
//     category: "Accessories",
//     rating: 4,
//     reviews: 128,
//     badge: "Bestseller",
//     image: "src/assets/watch.jpg",
//   },
//   {
//     id: "2",
//     name: "Wireless Noise-Cancelling Headphones",
//     price: 299.00,
//     originalPrice: null,
//     category: "Electronics",
//     rating: 5,
//     reviews: 342,
//     badge: "New",
//     image: "src/assets/headphone.jpg",
//   },
//   {
//     id: "3",
//     name: "Ceramic Pour-Over Coffee Set",
//     price: 78.50,
//     originalPrice: null,
//     category: "Kitchen",
//     rating: 5,
//     reviews: 203,
//     badge: "Popular",
//     image: "src/assets/coffee.jpg",
//   },
//   {
//     id: "4",
//     name: "Merino Wool Beanie",
//     price: 35.00,
//     originalPrice: 50.00,
//     category: "Apparel",
//     rating: 4,
//     reviews: 89,
//     badge: null,
//     image: "src/assets/wool_beanie.jpg",
//   },
// ];

// const App = () => (
//   <BrowserRouter>
//     <AuthProvider>
//       <CartProvider>
//         <div style={{
//           padding: "100px 24px",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
//           gap: "24px",
//           maxWidth: "1280px",
//           margin: "0 auto"
//         }}>
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </CartProvider>
//     </AuthProvider>
//   </BrowserRouter>
// );

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
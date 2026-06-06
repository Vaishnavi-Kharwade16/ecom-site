import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";
import InsertProduct from "./pages/InsertProduct";
import ListProducts from "./pages/ListProducts";
import ListUsers from "./pages/ListUsers";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";
import OrderHistory from "./pages/OrderHistory";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/cart" element={<CartPage />} />
             <Route path="/auth" element={<Auth />} /> 
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/admin" element={<Navigate to="/admin/products" replace />} />
            <Route path="/admin/insert-product" element={<InsertProduct />} />
            <Route path="/admin/products" element={<ListProducts />} />
            <Route path="/admin/users" element={<ListUsers />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
          <Footer />
          
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
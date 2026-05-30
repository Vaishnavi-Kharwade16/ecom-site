import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import Auth from "./pages/Auth";
import InsertProduct from "./pages/InsertProduct";
import Footer from "./components/Footer";
import Favorites from "./pages/Favorites";

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
            <Route path="/admin" element={<InsertProduct />} />
          
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}


export default App;
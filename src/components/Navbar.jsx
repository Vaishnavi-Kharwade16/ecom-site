// import { Link, useLocation } from "react-router-dom";
// import { useCart } from "../context/CartContext";
// import { useAuth } from "../context/AuthContext";
// import { useState } from "react";

// const Navbar = () => {
//   const { totalItems } = useCart();
//   const { user, signOut, isAdmin} = useAuth();
//   const { user, signOut, isAdmin } = useAuth();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const location = useLocation();

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
          
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-gray-900">
           
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <Link 
//               to="/" 
//               className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
//             >
//               Home
//             </Link>
//             <Link 
//               to="/cart" 
//               className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/cart") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
//             >
//               Cart
//             </Link>
//             {isAdmin && (
//               <Link 
//                 to="/insert-product" 
//                 className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/insert-product") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
//               >
//                 Add Product
//               </Link>
//             )}
            
//             {/* Cart Icon with Badge */}
//             <Link to="/cart" className="relative p-2">
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                 <circle cx="9" cy="21" r="1"/>
//                 <circle cx="20" cy="21" r="1"/>
//                 <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
//               </svg>
//               {totalItems > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
            
//           <Link
//              to="/favorites"
//              className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/favorites") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
//               >
//                 Favorites
//               </Link>
//              {isAdmin && (
//   <Link
//     to="/admin"
//     className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/admin") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
//   >
//     Admin
//   </Link>
// )}

//             {/* Auth Section */}
//             {user ? (
//               <div className="flex items-center gap-3">
//                 <span className="text-gray-700 font-medium">Hi, {user.name}</span>
//                 <button 
//                   onClick={signOut} 
//                   className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link 
//                 to="/auth" 
//                 className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium transition"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setMobileOpen(!mobileOpen)} 
//             className="md:hidden p-2"
//           >
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//               {mobileOpen ? (
//                 <path d="M18 6L6 18M6 6l12 12"/>
//               ) : (
//                 <path d="M3 12h18M3 6h18M3 18h18"/>
//               )}
//             </svg>
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {mobileOpen && (
//           <div className="md:hidden pb-4 space-y-3 pt-2 border-t">
//             <Link 
//               to="/" 
//               className="block text-gray-700 hover:text-gray-900 font-medium py-2"
//               onClick={() => setMobileOpen(false)}
//             >
//               Home
//             </Link>
//             <Link 
//               to="/cart" 
//               className="block text-gray-700 hover:text-gray-900 font-medium py-2"
//               onClick={() => setMobileOpen(false)}
//             >
//               Cart ({totalItems})
//             </Link>
//             <Link
//                 to="/favorites"
//                   className="block text-gray-700 hover:text-gray-900 font-medium py-2"
//                    onClick={() => setMobileOpen(false)}
//                         >
//                          Favorites
//                           </Link>
// {isAdmin && (
//   <Link
//     to="/admin"
//     className="block text-gray-700 hover:text-gray-900 font-medium py-2"
//     onClick={() => setMobileOpen(false)}
//   >
//     Admin
//   </Link>
// )}

//             {isAdmin && (
//               <Link 
//                 to="/insert-product" 
//                 className="block text-gray-700 hover:text-gray-900 font-medium py-2"
//                 onClick={() => setMobileOpen(false)}
//               >
//                 Add Product
//               </Link>
//             )}
//             {user ? (
//               <>
//                 <span className="block text-gray-700 py-2">Hi, {user.name}</span>
//                 <button 
//                   onClick={() => { signOut(); setMobileOpen(false); }} 
//                   className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link 
//                 to="/auth" 
//                 className="block bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium text-center"
//                 onClick={() => setMobileOpen(false)}
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { totalItems } = useCart();
  const { user, signOut, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");
  const adminActive = ["/admin", "/admin/insert-product", "/admin/products", "/admin/users"].some((path) => isActive(path));

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
             Arcè
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
            >
              Home
            </Link>

            <Link
              to="/favorites"
              className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/favorites") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
            >
              Favorites
            </Link>
            <Link to="/orders" className={`text-gray-700 hover:text-gray-900 font-medium ${isActive("/orders") ? "text-gray-900 border-b-2 border-gray-900" : ""}`}>
               Orders
              </Link>

            {isAdmin && (
              <div
                className="relative"
                onMouseEnter={() => setAdminOpen(true)}
                onMouseLeave={() => setAdminOpen(false)}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition ${adminActive ? "text-gray-900 border-b-2 border-gray-900" : ""}`}
                >
                  Admin
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className={`absolute left-0 top-full z-50 mt-3 w-48 rounded-2xl border border-gray-200 bg-white shadow-2xl transition duration-200 ${adminOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}>
                  <Link
                    to="/admin/insert-product"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Product Insert
                  </Link>
                  <Link
                    to="/admin/products"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    List Products
                  </Link>
                  <Link
                    to="/admin/users"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    List Users
                  </Link>
                </div>
              </div>
            )}

            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Hi, {user.name}</span>
                <button
                  onClick={signOut}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 font-medium transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium transition"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12"/>
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18"/>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-3 pt-2 border-t">
            <Link
              to="/"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Cart ({totalItems})
            </Link>
            <Link
              to="/favorites"
              className="block text-gray-700 hover:text-gray-900 font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Favorites
            </Link>
            <Link to="/orders" className="block text-gray-700 hover:text-gray-900 font-medium py-2" onClick={() => setMobileOpen(false)}>
                Orders
                    </Link>
            {isAdmin && (
              <>
                <Link
                  to="/admin/insert-product"
                  className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Product Insert
                </Link>
                <Link
                  to="/admin/products"
                  className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  List Products
                </Link>
                <Link
                  to="/admin/users"
                  className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  List Users
                </Link>
              </>
            )}
            {user ? (
              <>
                <span className="block text-gray-700 py-2">Hi, {user.name}</span>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="block w-full text-left text-gray-700 hover:text-gray-900 font-medium py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="block bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 font-medium text-center"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { Link } from "react-router-dom";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400 font-sans mt-20">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-14 flex flex-wrap gap-12 justify-between">

        {/* Brand Section */}
        <div className="max-w-xs">
          <h2 className="text-white text-2xl font-extrabold tracking-tight mb-3">
            Arcè
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-6">
            Curated goods, delivered with care. Thoughtfully sourced products for modern living.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {["T", "I", "P"].map((s, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 text-xs font-bold hover:border-white hover:text-white transition-all duration-200"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div className="flex gap-16 flex-wrap">

          {/* Shop Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">
              Shop
            </h4>
            <Link to="/" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              All Products
            </Link>
            <Link to="/favorites" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Favorites
            </Link>
            <Link to="/cart" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Cart
            </Link>
          </div>

          {/* Account Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">
              Account
            </h4>
            <Link to="/auth" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Sign In
            </Link>
            <Link to="/auth?tab=signup" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Create Account
            </Link>
          </div>

          {/* Help Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">
              Help
            </h4>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              FAQ
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Returns
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
              Contact Us
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          
          <span className="text-xs text-gray-600">
            © {year} Arcè. All rights reserved.
          </span>

          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-600 hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;

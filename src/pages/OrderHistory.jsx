import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const OrderHistory = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!user || !token) return;

    axios
      .get("http://localhost:5000/api/orders/my-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user, token]); 

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <span className="text-5xl">🔒</span>
        <h2 className="text-2xl font-extrabold text-gray-900">Sign in to view orders</h2>
        <Link to="/auth" className="px-6 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-700 transition">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 font-sans">
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-1">
            Order History
          </h1>
          <p className="text-sm text-gray-400">
            View and track all your previous purchases here.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <span className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"/>
          </div>

        ) : orders.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="text-6xl">📦</span>
            <h3 className="text-xl font-extrabold text-gray-900">No orders yet</h3>
            <p className="text-sm text-gray-400">You haven't placed any orders yet.</p>
            <Link
              to="/"
              className="mt-2 px-7 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-700 transition"
            >
              Browse Products
            </Link>
          </div>

        ) : (
          /* Orders List */
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">

                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                      Order ID
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                      Date
                    </p>
                    <p className="text-sm font-bold text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric", month: "short", year: "numeric"
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                      Total
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ${order.totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider
                      ${order.status === "delivered" ? "bg-green-50 text-green-700" :
                        order.status === "cancelled" ? "bg-red-50 text-red-700" :
                        order.status === "processing" ? "bg-blue-50 text-blue-700" :
                        "bg-yellow-50 text-yellow-700"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                <div className="flex flex-col gap-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image || `https://placehold.co/56x56/eee/aaa?text=${encodeURIComponent(item.name)}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">
                      Shipping Address
                    </p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.name}, {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </p>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
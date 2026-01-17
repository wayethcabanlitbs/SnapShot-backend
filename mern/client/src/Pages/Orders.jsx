import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Display user order history
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch orders from API on page load
  useEffect(() => {
    fetchOrders();
  }, []);

  // Retrieve user's orders from database
  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      
      // If no user logged in, redirect to login
      if (!user || !user.email) {
        navigate("/login");
        return;
      }

      const res = await fetch("/api/orders");
      
      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }
      
      const data = await res.json();
      
      // Filter orders by current user's email
      const userOrders = data.filter(order => order.email === user.email);
      
      setOrders(userOrders || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold">Your Orders</h1>
            <button
              onClick={() => navigate("/home")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition btn-enhanced"
            >
              ← Back to Shop
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading orders...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-600 mb-4">No orders yet.</p>
              <button
                onClick={() => navigate("/home")}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition btn-enhanced"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">{order.name}</h3>
                      <p className="text-sm text-gray-600">
                        Order ID: {order._id.substring(0, 12)}...
                      </p>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${order.total}</p>
                      <p className="text-sm text-green-600 mt-1">✓ Confirmed</p>
                    </div>
                  </div>

                  <div className="mb-4 pb-4 border-b">
                    <p className="font-semibold mb-2">Items:</p>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-700">
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 mx-2">×</span>
                          <span>{item.quantity}</span>
                          <span className="float-right">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Email:</span> {order.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {order.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Address:</span> {order.address}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

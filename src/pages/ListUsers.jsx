import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const initialForm = {
  name: "",
  email: "",
  role: "user",
};

const ListUsers = () => {
  const { isAdmin, token } = useAuth();
  const [users, setUsers] = useState([]);
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
    const loadUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setStatus({ type: "error", message: "Unable to load users." });
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setStatus({ type: "error", message: "Unable to load users." });
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (user) => {
    setEditing(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
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
        `${import.meta.env.VITE_API_URL}/api/users/${editing._id}`,
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStatus({ type: "success", message: "User updated successfully." });
      setEditing(null);
      fetchUsers();
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Unable to update user.",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatus({ type: "success", message: "User deleted successfully." });
      fetchUsers();
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.error || "Unable to delete user.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
            <p className="mt-2 text-sm text-gray-500">View, update, or remove registered users.</p>
          </div>
          <button
            onClick={() => navigate("/admin/products")}
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 transition"
          >
            Manage Products
          </button>
        </div>

        {status && (
          <div className={`rounded-xl px-4 py-3 mb-6 text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {status.message}
          </div>
        )}

        {editing && (
          <form onSubmit={handleUpdate} className="mb-8 space-y-6 rounded-3xl bg-white p-6 shadow-md">
            <div className="grid gap-4 sm:grid-cols-3">
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
                <span className="text-sm font-semibold text-gray-700">Email</span>
                <input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-gray-700">Role</span>
                <select
                  required
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-gray-900"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
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
          <p className="text-center text-gray-600">Loading users...</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 space-x-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="rounded-full bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
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

export default ListUsers;

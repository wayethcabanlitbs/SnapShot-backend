import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Admin.css";

// Admin panel page - manage all users, toggle admin status, and delete accounts
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Check if user is admin on component mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.isAdmin) {
      navigate("/home");
      return;
    }
    fetchUsers();
  }, [navigate]);

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch("/api/users/admin/users-list", {
        method: "GET",
        headers: {
          "x-user-id": user._id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
      console.log("✅ Fetched", data.length, "users");
    } catch (err) {
      console.error("❌ Error fetching users:", err.message);
      setErrorMessage("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle admin status for a user
  const handleToggleAdmin = async (userId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/users/admin/users/${userId}/toggle-admin`, {
        method: "PUT",
        headers: {
          "x-user-id": user._id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle admin status");
      }

      const data = await response.json();
      setUsers(users.map((u) => (u._id === userId ? { ...u, isAdmin: !u.isAdmin } : u)));
      setSuccessMessage(`Admin status updated for ${data.user.name}`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error toggling admin:", err.message);
      setErrorMessage("Failed to update admin status");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // Delete a user
  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const response = await fetch(`/api/users/admin/users/${userId}`, {
        method: "DELETE",
        headers: {
          "x-user-id": user._id,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter((u) => u._id !== userId));
      setSuccessMessage(`${userName} has been deleted`);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("❌ Error deleting user:", err.message);
      setErrorMessage("Failed to delete user");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <h1>Admin Panel</h1>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="users-table-wrapper">
            <h2>All Users ({users.length})</h2>
            {users.length === 0 ? (
              <p className="no-users">No users found</p>
            ) : (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Admin Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className={user.isAdmin ? "admin-row" : ""}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "N/A"}</td>
                      <td>
                        <span className={user.isAdmin ? "admin-badge" : "user-badge"}>
                          {user.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className={`btn-toggle ${user.isAdmin ? "revoke" : "grant"}`}
                            onClick={() => handleToggleAdmin(user._id)}
                          >
                            {user.isAdmin ? "Revoke Admin" : "Grant Admin"}
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => handleDeleteUser(user._id, user.name)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

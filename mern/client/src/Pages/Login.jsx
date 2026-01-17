import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Login.css";

// User login page - authenticates user and stores session
export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Update form state as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Authenticate user and save session to localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validate form
    if (!formData.email || !formData.password) {
      setErrorMessage("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      console.log("🔐 Login response status:", response.status);

      const data = await response.json();
      console.log("🔐 Login response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      setSuccessMessage("✓ Login successful! Redirecting...");
      setFormData({
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("❌ Login error:", err.message);
      setErrorMessage("✗ " + (err.message || "Failed to login. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="login__page">
        {/* Hero Section */}
        <section className="login__hero">
          <div className="section__container login__hero__content">
            <h1 className="section__header">Welcome Back</h1>
            <p className="section__description">
              Log in to your SnapShot account to continue shopping
            </p>
          </div>
        </section>

        {/* Login Form Section */}
        <section className="login__form__section">
          <div className="section__container login__form__container">
            <div className="login__form__wrapper">
              <div className="login__form__content">
                <h2>Login to Your Account</h2>

                {successMessage && (
                  <div className="login__message login__success">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="login__message login__error">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="login__form">
                  <div className="form__group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="password">Password *</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn contact__submit btn-enhanced"
                    disabled={loading}
                    style={{ fontSize: "1.05rem", padding: "1.1rem" }}
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <div className="login__footer">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="login__link">
                      Sign up here
                    </Link>
                  </p>
                </div>
              </div>

              {/* Login Info Sidebar */}
              <div className="login__info">
                <h3>Quick Access</h3>
                <ul className="login__benefits">
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Fast Checkout:</strong> Use saved addresses and payment methods
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Order History:</strong> View all your past orders
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Track Orders:</strong> Monitor your shipments in real-time
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Personalized:</strong> Get recommendations based on your preferences
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Secure Account:</strong> Your data is encrypted and protected
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

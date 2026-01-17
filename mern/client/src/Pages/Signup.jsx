import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";

// User registration page - creates new account in MongoDB
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
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

  // Send signup data to API and store user in localStorage
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMessage("Please fill in all required fields");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
        }),
      });

      console.log("📝 Signup response status:", response.status);

      const data = await response.json();
      console.log("📝 Signup response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("isLoggedIn", "true");

      setSuccessMessage("✓ Account created successfully! Redirecting...");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.error("❌ Signup error:", err.message);
      setErrorMessage("✗ " + (err.message || "Failed to create account. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup__page">
        {/* Hero Section */}
        <section className="signup__hero">
          <div className="section__container signup__hero__content">
            <h1 className="section__header">Create Your Account</h1>
            <p className="section__description">
              Join SnapShot today and start exploring premium camera collections
            </p>
          </div>
        </section>

        {/* Signup Form Section */}
        <section className="signup__form__section">
          <div className="section__container signup__form__container">
            <div className="signup__form__wrapper">
              <div className="signup__form__content">
                <h2>Sign Up</h2>

                {successMessage && (
                  <div className="signup__message signup__success">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="signup__message signup__error">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="signup__form">
                  <div className="form__group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
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
                      placeholder="At least 6 characters"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="confirmPassword">Confirm Password *</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
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
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </form>

                <div className="signup__footer">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="signup__link">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>

              {/* Signup Info Sidebar */}
              <div className="signup__info">
                <h3>Why Join SnapShot?</h3>
                <ul className="signup__benefits">
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Exclusive Deals:</strong> Get access to special offers and discounts
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Order Tracking:</strong> Monitor your purchases in real-time
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Wishlist:</strong> Save your favorite cameras
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Expert Support:</strong> Get help from our support team
                  </li>
                  <li>
                    <span className="benefit__icon">✓</span>
                    <strong>Reviews:</strong> Share your experiences with our community
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

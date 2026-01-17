import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Navbar component used on Home, Contact, and Orders pages
export default function LandingNavbar({ openCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check localStorage for logged-in user on mount
  useEffect(() => {
    // Check if user is logged in
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage) {
      try {
        setUser(JSON.parse(userFromStorage));
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }

    // Listen for storage changes (e.g., when signing up on Signup page)
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem("user");
      if (updatedUser) {
        try {
          setUser(JSON.parse(updatedUser));
        } catch (err) {
          console.error("Error parsing user data:", err);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const menuIconClass = isOpen ? "ri-close-line" : "ri-menu-line";

  // Navigate to landing and scroll to specific section
  const goToSection = (id) => {
    setIsOpen(false);

    // If we're already on landing, just scroll
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // If we're on another page, go to landing first, then scroll
    navigate(`/#${id}`);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  // Clear user session and redirect to home
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav>
      <div className="nav__header">
        <div className="nav__logo">
          <button
            className="logo"
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => goToSection("home")}
            type="button"
          >
            SnapShot
          </button>
        </div>

        <div
          className="nav__menu__btn"
          id="menu-btn"
          onClick={() => setIsOpen((v) => !v)}
        >
          <i className={menuIconClass}></i>
        </div>
      </div>

      <ul
        className={`nav__links ${isOpen ? "open" : ""}`}
        id="nav-links"
        onClick={() => setIsOpen(false)}
      >
        <li><button type="button" onClick={() => goToSection("home")}>HOME</button></li>
        <li><button type="button" onClick={() => goToSection("about")}>ABOUT</button></li>
        <li><button type="button" onClick={() => goToSection("service")}>SERVICE</button></li>
        <li><Link to="/home" onClick={() => setIsOpen(false)}>CAMERAS</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link></li>

        {user && user.isAdmin && (
          <li><Link to="/admin" onClick={() => setIsOpen(false)}>ADMIN PANEL</Link></li>
        )}

        {!user && (
          <li>
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              SIGN UP
            </Link>
          </li>
        )}
        {user && (
          <li>
            <button type="button" onClick={handleLogout} style={{ color: "#ff6b6b" }}>
              LOGOUT
            </button>
          </li>
        )}
      </ul>

      <div className="nav__btns">
        {openCart && (
          <button 
            className="btn btn-enhanced" 
            type="button" 
            onClick={openCart}
            style={{ padding: "0.75rem 1.25rem", fontSize: "0.95rem", marginRight: "1rem", whiteSpace: "nowrap", flexShrink: 0 }}
          >
            🛒 CART
          </button>
        )}
        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", whiteSpace: "nowrap", flexShrink: 1, minWidth: 0 }}>
            <span style={{ color: "#000", fontWeight: "600", fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "100px", flexShrink: 1 }}>
              👤 {user.name}
            </span>
            <button 
              className="btn btn-enhanced" 
              type="button" 
              onClick={handleLogout}
              style={{ padding: "0.75rem 1.25rem", fontSize: "0.9rem", whiteSpace: "nowrap", flexShrink: 0 }}
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <button className="btn btn-enhanced" type="button" onClick={() => navigate("/signup")} style={{ padding: "0.75rem 1.75rem", fontSize: "0.95rem", whiteSpace: "nowrap", flexShrink: 0 }}>
            SIGN UP
          </button>
        )}
      </div>
    </nav>
  );
}

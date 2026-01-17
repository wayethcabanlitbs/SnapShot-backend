import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

// Navbar for landing page with smooth scroll navigation
export default function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuIconClass = isOpen ? "ri-close-line" : "ri-menu-line";

  // Scroll to section or navigate to landing first if needed
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
        <li><button type="button" onClick={() => goToSection("cameras")}>CAMERAS</button></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>CONTACT</Link></li>

        {/* Shop page */}
        <li>
          <Link to="/home" onClick={() => setIsOpen(false)}>
            SHOP
          </Link>
        </li>

        {/* Signup page */}
        <li>
          <Link to="/signup" onClick={() => setIsOpen(false)}>
            SIGN UP
          </Link>
        </li>
      </ul>

      <div className="nav__btns">
        <button className="btn" type="button" onClick={() => navigate("/signup")}>
          SIGN UP
        </button>
      </div>
    </nav>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ScrollReveal from "scrollreveal";
import Swiper from "swiper";
import "swiper/css";

import "./landing.css";
import Navbar from "../components/Navbar";

// ✅ images (Vite + src/assets)
import blackcam from "../assets/blackcam.png";
import coloredcam from "../assets/coloredcam.png";
import cam6 from "../assets/cam6.png";
import showcase1 from "../assets/showcase1.jpg";
import man from "../assets/man.jpg";
import woman from "../assets/woman.jpg";
import woman2 from "../assets/woman2.jpg";
import man2 from "../assets/man2.jpg";

// Landing/home page with hero section and product showcase
export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const swiperInstanceRef = useRef(null);
  const navigate = useNavigate();

  const menuIconClass = isOpen ? "ri-close-line" : "ri-menu-line";

  // Check for logged-in user on component mount
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
    // Listen for storage changes
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
    return () => window.removeEventListener("storage", handleStorageChange);  }, []);

  // Clear user data and redirect to landing
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  // ScrollReveal animation options
  const scrollRevealOption = useMemo(
    () => ({
      origin: "bottom",
      distance: "50px",
      duration: 1000,
    }),
    []
  );

  // Initialize ScrollReveal animations on page load
  useEffect(() => {
    // ---- ScrollReveal ----
    const sr = ScrollReveal();

    sr.reveal(".header__image img", { ...scrollRevealOption, origin: "right" });
    sr.reveal(".header__content p", { ...scrollRevealOption, delay: 500 });
    sr.reveal(".header__content h1", { ...scrollRevealOption, delay: 1000 });
    sr.reveal(".header__btns", { ...scrollRevealOption, delay: 1500 });

    sr.reveal(".bestsellers__card", { ...scrollRevealOption, interval: 500 });

    sr.reveal(".service__image img", { ...scrollRevealOption, origin: "left" });
    sr.reveal(".service__content h4", { ...scrollRevealOption, delay: 500 });
    sr.reveal(".service__content p", { ...scrollRevealOption, delay: 1000 });
    sr.reveal(".service__btn", { ...scrollRevealOption, delay: 1500 });

    sr.reveal(".banner__card", { ...scrollRevealOption, interval: 500 });
    sr.reveal(".more__card", { ...scrollRevealOption, interval: 500 });

    // ---- Swiper ----
    if (swiperInstanceRef.current?.destroy) {
      swiperInstanceRef.current.destroy(true, true);
    }

    swiperInstanceRef.current = new Swiper(".swiper", {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
    });

    return () => {
      if (swiperInstanceRef.current?.destroy) {
        swiperInstanceRef.current.destroy(true, true);
      }
    };
  }, [scrollRevealOption]);

  return (
    <>
      <Navbar />

      {/* Header section */}
      <header id="home">
        <div className="header__container">
          <div className="header__content">
            <p>Unleash Your Creativity with the Best Cameras.</p>
            <h1>Turn Every Moment into a Masterpiece!</h1>

            <div className="header__btns">
              <button className="btn inquire-btn" type="button" onClick={() => navigate("/contact")}>
                Inquire Now!
              </button>
              <a href="#contact" aria-label="Go to contact">
                <span><i className="ri-play-circle-fill"></i></span>
              </a>
            </div>
          </div>

          <div className="header__image">
            <img src={blackcam} alt="header" />
          </div>
        </div>
      </header>

      {/* Bestsellers section */}
      <section className="section__container bestsellers__container" id="about">
        <h2 className="section__header">Our bestsellers</h2>
        <p className="section__description">Find Your Perfect Camera</p>

        <div className="bestsellers__grid">
          <div className="bestsellers__card">
            <img src={blackcam} alt="bestsellers" />
            <div className="bestsellers__card__details">
              <div>
                <h4>Polaroid Go Instant Camera</h4>
                <p>Black</p>
              </div>
              <div className="bestsellers__rating">
                <span><i className="ri-star-fill"></i></span>
                4.7
              </div>
            </div>
          </div>

          <div className="bestsellers__card">
            <img src={coloredcam} alt="bestsellers" />
            <div className="bestsellers__card__details">
              <div>
                <h4>Polaroid Now i-Type Instant Camera</h4>
                <p>Yellow</p>
              </div>
              <div className="bestsellers__rating">
                <span><i className="ri-star-fill"></i></span>
                4.5
              </div>
            </div>
          </div>

          <div className="bestsellers__card">
            <img src={cam6} alt="bestsellers" />
            <div className="bestsellers__card__details">
              <div>
                <h4>Polaroid Go Generation 2 Instant Camera</h4>
                <p>White</p>
              </div>
              <div className="bestsellers__rating">
                <span><i className="ri-star-fill"></i></span>
                4.8
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section className="section__container about__container" id="service">
        <h2 className="section__header">More Than Just Cameras</h2>
        <p className="section__description">Empowering Your Photography Journey</p>

        <div className="about__grid">
          <div className="about__card">
            <div className="about__card__bg">
              <span><i className="ri-camera-2-fill"></i></span>
              <h4>Camera Rental Services</h4>
            </div>
            <div className="about__card__content">
              <span><i className="ri-camera-2-fill"></i></span>
              <h4>Rent and snap away!</h4>
              <p>
                Explore a wide range of professional-grade cameras, lenses, and accessories available for rent.
              </p>
            </div>
          </div>

          <div className="about__card">
            <div className="about__card__bg">
              <span><i className="ri-presentation-fill"></i></span>
              <h4>Photography Workshops and Tutorials</h4>
            </div>
            <div className="about__card__content">
              <span><i className="ri-presentation-fill"></i></span>
              <h4>Learn from professionals</h4>
              <p>Learn the art of photography from seasoned professionals.</p>
            </div>
          </div>

          <div className="about__card">
            <div className="about__card__bg">
              <span><i className="ri-customer-service-fill"></i></span>
              <h4>Custom Camera Setup Assistance</h4>
            </div>
            <div className="about__card__content">
              <span><i className="ri-customer-service-fill"></i></span>
              <h4>Tailored Setup</h4>
              <p>
                Let us help you customize your camera’s settings for your specific photography style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="section__container service__container" id="cameras">
        <div className="service__image">
          <img src={showcase1} alt="service" />
        </div>
        <div className="service__content">
          <h4>Unleash Your Vision with SnapShot</h4>
          <p>
            Every great photograph starts with the right gear. At SnapShot, we’re here to empower your creativity.
          </p>
          <p>
            Let us inspire you as you discover the art of storytelling through the lens.
          </p>

          <div className="service__btn">
            <button className="btn service-btn-enhanced" type="button" onClick={() => navigate("/home")}>
              Shop Cameras Now ➜
            </button>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="section__container banner__container">
        <div className="banner__card">
          <h4>10+</h4>
          <p>Years Experience</p>
        </div>
        <div className="banner__card">
          <h4>19K</h4>
          <p>Happy Customers</p>
        </div>
        <div className="banner__card">
          <h4>4.7</h4>
          <p>Overall Ratings</p>
        </div>
      </section>

      {/* More */}
      <section className="section__container more__container">
        <h2 className="section__header">Discover the World Through Your Lens</h2>
        <p className="section__description">Capture Moments Like Never Before</p>

        <div className="more__grid">
          <div className="more__card">
            <span><i className="ri-camera-lens-line"></i></span>
            <h4>Professional Photography</h4>
            <p>Master the art of photography with top-tier equipment and expert tutorials.</p>
          </div>
          <div className="more__card">
            <span><i className="ri-calendar-event-fill"></i></span>
            <h4>Event Memories</h4>
            <p>Rent high-quality cameras to ensure every moment at your events is captured with stunning clarity.</p>
          </div>
          <div className="more__card">
            <span><i className="ri-polaroid-fill"></i></span>
            <h4>Custom Gear Setup</h4>
            <p>Personalize your photography equipment to suit your unique style and preferences.</p>
          </div>
        </div>
      </section>

      {/* Reviews (Swiper) */}
      <section className="section__container review__container">
        <h2 className="section__header">Loved by Thousands of Photography Enthusiasts</h2>
        <p className="section__description">
          Hear the stories of passion and unforgettable memories shared by our valued clients.
        </p>

        <div className="swiper">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <div className="review__card">
                <div className="review__content">
                  <div className="review__rating">
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                  </div>
                  <p>
                    "SnapShot has completely revolutionized the way I capture moments. From everyday scenes to unforgettable
                    trips, their cameras deliver unmatched quality and ease of use..."
                  </p>
                </div>
                <div className="review__details">
                  <img src={man} alt="review" />
                  <div>
                    <h4>Stanford Braun</h4>
                    <h5>Travel Blogger</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="review__card">
                <div className="review__content">
                  <div className="review__rating">
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                  </div>
                  <p>
                    "My recent photoshoot with SnapShot's equipment was a dream come true! The high-quality lenses and
                    intuitive design allowed me to capture every detail beautifully..."
                  </p>
                </div>
                <div className="review__details">
                  <img src={woman} alt="review" />
                  <div>
                    <h4>Abbie Larson</h4>
                    <h5>Adventure Enthusiast</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="review__card">
                <div className="review__content">
                  <div className="review__rating">
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                  </div>
                  <p>
                    "SnapShot provided the perfect tools for my documentary project. Their customizable gear and expert
                    support helped me bring my vision to life..."
                  </p>
                </div>
                <div className="review__details">
                  <img src={woman2} alt="review" />
                  <div>
                    <h4>Naomie Littel</h4>
                    <h5>Cultural Historian</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="swiper-slide">
              <div className="review__card">
                <div className="review__content">
                  <div className="review__rating">
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                    <span><i className="ri-star-fill"></i></span>
                  </div>
                  <p>"SnapShot is cool"</p>
                </div>
                <div className="review__details">
                  <img src={man2} alt="review" />
                  <div>
                    <h4>Alex Morgan</h4>
                    <h5>Business Executive</h5>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <div className="section__container footer__container">
          <div className="footer__col">
            <div className="footer__logo">
              <a href="#home" className="logo">SnapShot</a>
            </div>
            <p>
              Explore the world through the lens of creativity with SnapShot, your ultimate photography platform.
            </p>
            <ul className="footer__socials">
              <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
              <li><a href="#"><i className="ri-instagram-line"></i></a></li>
              <li><a href="#"><i className="ri-youtube-line"></i></a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Quick Links</h4>
            <ul className="footer__links">
              <li><a href="#home">HOME</a></li>
              <li><a href="#about">ABOUT</a></li>
              <li><a href="#service">SERVICE</a></li>
              <li><a href="#cameras">CAMERAS</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Contact Us</h4>
            <ul className="footer__links">
              <li>
                <a href="#"><span><i className="ri-phone-fill"></i></span> +971 55 224 8602</a>
              </li>
              <li>
                <a href="#"><span><i className="ri-record-mail-line"></i></span> support@snapshot.com</a>
              </li>
              <li>
                <a href="#"><span><i className="ri-map-pin-2-fill"></i></span> RAK, UAE</a>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4>Subscribe</h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Enter your email" />
              <button className="btn btn-enhanced" type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer__bar">
          Copyright © 2025 Wayeth Ken C. Cabanlit. All rights reserved.
        </div>
      </footer>
    </>
  );
}

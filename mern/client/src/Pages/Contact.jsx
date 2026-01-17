import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Contact.css";

// Contact form page - stores messages in MongoDB
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Update form fields as user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send contact message to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log("📨 Contact response status:", response.status);

      const data = await response.json();
      console.log("📨 Contact response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setSuccessMessage("✓ Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (err) {
      console.error("❌ Contact error:", err.message);
      setErrorMessage("✗ Failed to send message. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="contact__page">
        {/* Hero Section */}
        <section className="contact__hero">
          <div className="section__container contact__hero__content">
            <h1 className="section__header">Get In Touch</h1>
            <p className="section__description">
              Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact__form__section">
          <div className="section__container contact__form__container">
            <div className="contact__form__wrapper">
              {/* Form */}
              <div className="contact__form__content">
                <h2>Send us a Message</h2>
                
                {successMessage && (
                  <div className="contact__message contact__success">
                    {successMessage}
                  </div>
                )}

                {errorMessage && (
                  <div className="contact__message contact__error">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact__form">
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
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form__group form__group__full">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      rows="6"
                      required
                      disabled={loading}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn contact__submit btn-enhanced"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="contact__info">
                <h2>Contact Information</h2>
                
                <div className="contact__info__item">
                  <div className="contact__info__icon">
                    <i className="ri-phone-fill"></i>
                  </div>
                  <div className="contact__info__content">
                    <h4>Phone</h4>
                    <p>+971 55 224 8602</p>
                  </div>
                </div>

                <div className="contact__info__item">
                  <div className="contact__info__icon">
                    <i className="ri-mail-line"></i>
                  </div>
                  <div className="contact__info__content">
                    <h4>Email</h4>
                    <p>support@snapshot.com</p>
                  </div>
                </div>

                <div className="contact__info__item">
                  <div className="contact__info__icon">
                    <i className="ri-map-pin-2-fill"></i>
                  </div>
                  <div className="contact__info__content">
                    <h4>Location</h4>
                    <p>RAK, UAE</p>
                  </div>
                </div>

                <div className="contact__info__item">
                  <div className="contact__info__icon">
                    <i className="ri-time-line"></i>
                  </div>
                  <div className="contact__info__content">
                    <h4>Business Hours</h4>
                    <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p>Sat - Sun: 10:00 AM - 4:00 PM</p>
                  </div>
                </div>

                <div className="contact__socials">
                  <p>Follow us on social media</p>
                  <ul className="footer__socials">
                    <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
                    <li><a href="#"><i className="ri-instagram-line"></i></a></li>
                    <li><a href="#"><i className="ri-youtube-line"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact-footer">
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
                <li><Link to="/">HOME</Link></li>
                <li><a href="/#about">ABOUT</a></li>
                <li><a href="/#service">SERVICE</a></li>
                <li><Link to="/home">CAMERAS</Link></li>
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
      </div>
    </>
  );
}

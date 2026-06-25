import React from "react";
import "./style.css";

// social icons
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Left Section */}
        <div className="footer-left">
          <h2 className="logo">🎬 MovieDX</h2>
          <p>
            Your ultimate destination for discovering, exploring and tracking
            the best movies and TV shows.
          </p>

          {/* SOCIAL ICONS */}
          <div className="socials">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/movies">Movies</a>
          <a href="/">TV Shows</a>
          <a href="/watchlist">Watchlist</a>
        </div>

        {/* Categories */}
        <div className="footer-column">
          <h3>Categories</h3>
          <a href="#">Action</a>
          <a href="#">Comedy</a>
          <a href="#">Drama</a>
          <a href="#">Horror</a>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>📧 support@movedx.com</p>
          <p>📞 +91 xxxxxxxxxx</p>
          <p>📍 prayagraj, India</p>
          <p>⏰ Mon - Sat: 10AM - 7PM</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 MovieDX. All rights reserved.</p>
        <p>Privacy Policy | Terms | Disclaimer</p>
        <p>Made with ❤️ by Ankit IIITA</p>
      </div>
    </footer>
  );
 }
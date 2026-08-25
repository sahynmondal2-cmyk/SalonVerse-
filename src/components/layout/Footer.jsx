import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-espresso text-cream py-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-6">SalonVerse<span className="text-champagne">.</span></h3>
          <p className="opacity-70 text-sm leading-relaxed max-w-xs">
            Discover exceptional beauty experiences, trusted professionals, and effortless appointments.
          </p>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-6 text-champagne">Explore</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <Link to="/services" className="hover:text-champagne transition-colors">Services</Link>
            <Link to="/stylists" className="hover:text-champagne transition-colors">Stylists</Link>
            <Link to="/lookbook" className="hover:text-champagne transition-colors">Lookbook</Link>
            <Link to="/packages" className="hover:text-champagne transition-colors">Packages</Link>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-6 text-champagne">Company</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <Link to="/about" className="hover:text-champagne transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-champagne transition-colors">Contact</Link>
            <Link to="/memberships" className="hover:text-champagne transition-colors">Memberships</Link>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-lg mb-6 text-champagne">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-80">
            <p>123 Beauty Avenue</p>
            <p>Mumbai, MH 400001</p>
            <p>hello@salonverse.com</p>
            <p>+91 98765 43210</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-center text-sm opacity-60">
        <p>&copy; {new Date().getFullYear()} SalonVerse. All rights reserved.</p>
      </div>
    </footer>
  );
};
export default Footer;
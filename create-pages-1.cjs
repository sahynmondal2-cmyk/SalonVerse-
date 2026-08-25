const fs = require('fs');
const path = require('path');

const files = {
  'src/components/layout/Navbar.jsx': `
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Heart, User, Sun, Moon } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import { cn } from '../common/Button';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme, user } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const links = [
    { name: 'Services', path: '/services' },
    { name: 'Stylists', path: '/stylists' },
    { name: 'Lookbook', path: '/lookbook' },
    { name: 'Packages', path: '/packages' },
    { name: 'Membership', path: '/memberships' },
    { name: 'Offers', path: '/offers' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-cream/90 dark:bg-surface/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-wider">
          SalonVerse<span className="text-champagne">.</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          {links.map(link => (
            <Link key={link.name} to={link.path} className="hover:text-champagne transition-colors">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden lg:flex items-center gap-5">
          <button onClick={toggleTheme} className="hover:text-champagne transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/search" className="hover:text-champagne transition-colors"><Search size={20} /></Link>
          <Link to="/customer/favorites" className="hover:text-champagne transition-colors"><Heart size={20} /></Link>
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/customer'} className="flex items-center gap-2 hover:text-champagne transition-colors">
              <User size={20} />
            </Link>
          ) : (
            <Link to="/login" className="hover:text-champagne transition-colors">Login</Link>
          )}
          <Link to="/services" className="px-5 py-2.5 bg-espresso text-cream dark:bg-cream dark:text-espresso rounded hover:bg-surface dark:hover:bg-gray-200 transition-colors font-medium text-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-cream dark:bg-surface shadow-xl p-6 flex flex-col gap-4 lg:hidden h-screen">
          {links.map(link => (
            <Link key={link.name} to={link.path} className="text-lg font-medium pb-2 border-b border-black/10 dark:border-white/10">
              {link.name}
            </Link>
          ))}
          <div className="flex justify-between items-center mt-4">
            <button onClick={toggleTheme} className="flex items-center gap-2 font-medium">
              {theme === 'dark' ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
  `,
  'src/components/layout/Footer.jsx': `
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
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Layout components created.");

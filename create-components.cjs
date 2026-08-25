const fs = require('fs');
const path = require('path');

const components = {
  'Button.jsx': `
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyle = "px-6 py-3 rounded font-medium text-sm tracking-wide transition-colors duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-espresso text-cream dark:bg-cream dark:text-espresso hover:bg-surface dark:hover:bg-gray-200",
    secondary: "border border-espresso text-espresso dark:border-cream dark:text-cream hover:bg-espresso/5 dark:hover:bg-cream/10",
    ghost: "text-espresso dark:text-cream hover:bg-espresso/5 dark:hover:bg-cream/10"
  };
  
  return (
    <button className={cn(baseStyle, variants[variant], className)} {...props}>
      {children}
    </button>
  );
};
export default Button;
  `,
  'Input.jsx': `
import React from 'react';
import { cn } from './Button';

const Input = React.forwardRef(({ className, type = 'text', label, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium opacity-80">{label}</label>}
      <input
        type={type}
        className={cn(
          "px-4 py-3 rounded bg-transparent border border-black/10 dark:border-white/10 focus:border-champagne focus:outline-none transition-colors w-full",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
Input.displayName = 'Input';
export default Input;
  `,
  'Select.jsx': `
import React from 'react';
import { cn } from './Button';

const Select = React.forwardRef(({ className, label, options, error, ...props }, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && <label className="text-sm font-medium opacity-80">{label}</label>}
      <select
        className={cn(
          "px-4 py-3 rounded bg-transparent border border-black/10 dark:border-white/10 focus:border-champagne focus:outline-none transition-colors w-full appearance-none",
          error && "border-red-500 focus:border-red-500",
          className
        )}
        ref={ref}
        {...props}
      >
        <option value="" disabled className="text-gray-500">Select an option</option>
        {options.map((opt, i) => (
          <option key={i} value={opt.value} className="bg-cream dark:bg-espresso text-espresso dark:text-cream">{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
});
Select.displayName = 'Select';
export default Select;
  `,
  'ServiceCard.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, Star } from 'lucide-react';
import Button from './Button';
import { AppContext } from '../../context/AppContext';

const ServiceCard = ({ service }) => {
  const { isFavorite, addFavorite, removeFavorite } = React.useContext(AppContext);
  const favorite = isFavorite('services', service.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) removeFavorite('services', service.id);
    else addFavorite('services', service.id);
  };

  return (
    <Link to={\`/service/\${service.id}\`} className="group flex flex-col glass rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img src={service.image} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <button onClick={toggleFavorite} className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors">
          <Heart size={18} className={favorite ? "fill-red-500 text-red-500" : "text-white"} />
        </button>
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/40 backdrop-blur-md text-white text-xs font-medium rounded-full">
          {service.category}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-serif font-medium">{service.name}</h3>
          <div className="flex items-center gap-1 text-sm font-medium">
            <Star size={14} className="fill-champagne text-champagne" />
            {service.rating}
          </div>
        </div>
        <p className="text-sm opacity-70 line-clamp-2 mb-4 flex-grow">{service.description}</p>
        <div className="flex items-center justify-between mb-4 text-sm opacity-80">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{service.duration} mins</span>
          </div>
          <span className="font-semibold text-champagne">₹{service.price}</span>
        </div>
        <Button variant="secondary" className="w-full py-2">Book Now</Button>
      </div>
    </Link>
  );
};
export default ServiceCard;
  `,
  'StylistCard.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import { AppContext } from '../../context/AppContext';
import Button from './Button';

const StylistCard = ({ stylist }) => {
  const { isFavorite, addFavorite, removeFavorite } = React.useContext(AppContext);
  const favorite = isFavorite('stylists', stylist.id);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (favorite) removeFavorite('stylists', stylist.id);
    else addFavorite('stylists', stylist.id);
  };

  return (
    <Link to={\`/stylist/\${stylist.id}\`} className="group flex flex-col items-center p-6 glass rounded-xl hover:-translate-y-1 transition-all duration-300 text-center relative">
      <button onClick={toggleFavorite} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
        <Heart size={18} className={favorite ? "fill-red-500 text-red-500" : "opacity-50"} />
      </button>
      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-champagne">
        <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
      </div>
      <h3 className="text-lg font-serif font-medium mb-1">{stylist.name}</h3>
      <p className="text-xs text-champagne font-medium uppercase tracking-wider mb-2">{stylist.role}</p>
      <div className="flex items-center gap-1 text-sm font-medium opacity-80 mb-4">
        <Star size={14} className="fill-current" />
        {stylist.rating} ({stylist.reviews} reviews)
      </div>
      <Button variant="secondary" className="w-full py-2 text-sm mt-auto">View Profile</Button>
    </Link>
  );
};
export default StylistCard;
  `
};

Object.entries(components).forEach(([name, content]) => {
  fs.writeFileSync(path.join(__dirname, 'src/components/common', name), content.trim());
});

// Create App.jsx and main.jsx
const mainContent = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AppProvider } from './context/AppContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
`;

const appContent = `
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Stylists from './pages/Stylists';
import StylistDetails from './pages/StylistDetails';
import Lookbook from './pages/Lookbook';
import LookDetails from './pages/LookDetails';
import Packages from './pages/Packages';
import Memberships from './pages/Memberships';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CustomerDashboard from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col selection:bg-champagne selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/stylists" element={<Stylists />} />
            <Route path="/stylist/:id" element={<StylistDetails />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/look/:id" element={<LookDetails />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/customer/*" element={<CustomerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;
`;

fs.writeFileSync(path.join(__dirname, 'src/main.jsx'), mainContent.trim());
fs.writeFileSync(path.join(__dirname, 'src/App.jsx'), appContent.trim());

console.log("Common components and App setup completed.");

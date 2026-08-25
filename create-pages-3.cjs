const fs = require('fs');
const path = require('path');

const files = {
  'src/pages/ServiceDetails.jsx': `
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Star, Clock, Check, Heart } from 'lucide-react';
import Button from '../components/common/Button';

const ServiceDetails = () => {
  const { id } = useParams();
  const { services, isFavorite, addFavorite, removeFavorite } = useContext(AppContext);
  const service = services.find(s => s.id === id);
  const favorite = isFavorite('services', id);

  if (!service) return <div className="pt-32 text-center text-2xl font-serif min-h-screen">Service not found</div>;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden h-[400px] lg:h-[600px]">
            <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
            <button 
              onClick={() => favorite ? removeFavorite('services', id) : addFavorite('services', id)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 transition-colors"
            >
              <Heart className={favorite ? "fill-red-500 text-red-500" : "text-white"} size={24} />
            </button>
            <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md text-white font-medium rounded-full uppercase tracking-wider text-sm">
              {service.category}
            </div>
          </div>

          {/* Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{service.name}</h1>
            <div className="flex items-center gap-6 mb-8 text-sm font-medium opacity-80">
              <div className="flex items-center gap-1">
                <Star className="fill-champagne text-champagne" size={18} />
                {service.rating} ({service.reviews} Reviews)
              </div>
              <div className="flex items-center gap-1">
                <Clock size={18} />
                {service.duration} mins
              </div>
              <div className="text-xl font-semibold text-champagne">
                ₹{service.price}
              </div>
            </div>

            <p className="text-lg opacity-80 mb-10 leading-relaxed">{service.description}</p>

            <div className="mb-10">
              <h3 className="text-xl font-serif font-medium mb-4">What's Included</h3>
              <ul className="space-y-3">
                {['Premium product application', 'Expert consultation', 'Relaxing head massage', 'Styling and finishing'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 opacity-80">
                    <div className="bg-champagne/20 p-1 rounded-full"><Check size={14} className="text-champagne" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button className="flex-1 py-4 text-base">Book This Service</Button>
              <Link to="/services" className="flex-1">
                <Button variant="secondary" className="w-full py-4 text-base">Explore More</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServiceDetails;
  `,
  'src/pages/Stylists.jsx': `
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import StylistCard from '../components/common/StylistCard';
import { motion } from 'framer-motion';

const Stylists = () => {
  const { stylists } = useContext(AppContext);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Experts</h1>
          <p className="opacity-70 text-lg">Meet our team of highly skilled and passionate professionals dedicated to bringing your beauty vision to life.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {stylists.map((stylist, i) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <StylistCard stylist={stylist} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Stylists;
  `,
  'src/pages/StylistDetails.jsx': `
import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Star, Heart, Award, Calendar } from 'lucide-react';
import Button from '../components/common/Button';

const StylistDetails = () => {
  const { id } = useParams();
  const { stylists, isFavorite, addFavorite, removeFavorite } = useContext(AppContext);
  const stylist = stylists.find(s => s.id === id);
  const favorite = isFavorite('stylists', id);

  if (!stylist) return <div className="pt-32 text-center font-serif text-2xl min-h-screen">Stylist not found</div>;

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="glass rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden">
          {/* Bg element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-champagne/10 rounded-full blur-3xl -z-10"></div>
          
          {/* Image */}
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0 border-4 border-champagne/30">
            <img src={stylist.image} alt={stylist.name} className="w-full h-full object-cover" />
          </div>

          {/* Info */}
          <div className="flex-grow text-center md:text-left">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{stylist.name}</h1>
                <p className="text-champagne font-medium uppercase tracking-wider text-sm mb-4">{stylist.role}</p>
              </div>
              <button 
                onClick={() => favorite ? removeFavorite('stylists', id) : addFavorite('stylists', id)}
                className="hidden md:flex p-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors"
              >
                <Heart className={favorite ? "fill-red-500 text-red-500" : "opacity-50"} size={20} />
              </button>
            </div>
            
            <p className="opacity-80 text-lg leading-relaxed mb-8">{stylist.bio}</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 font-semibold"><Star size={16} className="text-champagne fill-champagne" /> Rating</div>
                <span className="opacity-70">{stylist.rating} ({stylist.reviews} reviews)</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 font-semibold"><Award size={16} className="text-champagne" /> Experience</div>
                <span className="opacity-70">{stylist.experience}</span>
              </div>
              <div className="flex flex-col items-center md:items-start gap-1">
                <div className="flex items-center gap-2 font-semibold"><Calendar size={16} className="text-champagne" /> Specialty</div>
                <span className="opacity-70">{stylist.specialty}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center md:justify-start">
              <Button className="px-8 py-3">Book With {stylist.name.split(' ')[0]}</Button>
            </div>
          </div>
        </div>

        {/* Portfolio Section placeholder */}
        <div className="mt-20">
          <h2 className="text-3xl font-serif font-bold mb-8 text-center">Portfolio</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {[1,2,3,4,5,6].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden">
                  <img src={\`https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400&h=400&sig=\${i}\`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StylistDetails;
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Pages 3 created.");

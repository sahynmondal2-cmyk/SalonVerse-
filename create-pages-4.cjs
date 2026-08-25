const fs = require('fs');
const path = require('path');

const files = {
  'src/pages/Lookbook.jsx': `
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Lookbook = () => {
  const { lookbook, isFavorite, addFavorite, removeFavorite } = useContext(AppContext);
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'Trending', 'Bridal', 'Minimal', 'Glam', 'Hair', 'Nails', 'Makeup'];

  const filteredLooks = lookbook.filter(l => activeCategory === 'All' || l.category === activeCategory);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Beauty Lookbook</h1>
          <p className="opacity-70 text-lg">Discover the latest trends and get inspired for your next appointment.</p>
        </div>

        <div className="flex gap-3 overflow-x-auto w-full pb-4 scrollbar-hide justify-center mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={\`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors \${
                activeCategory === cat 
                  ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso' 
                  : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border border-black/5 dark:border-white/5'
              }\`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filteredLooks.map((look, i) => {
            const favorite = isFavorite('looks', look.id);
            return (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i%10) * 0.05 }}
                className="relative group break-inside-avoid rounded-xl overflow-hidden"
              >
                <img src={look.image} alt={look.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-serif text-xl mb-1">{look.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{look.category}</p>
                  <Link to={\`/look/\${look.id}\`} className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded text-sm text-center font-medium transition-colors">
                    View Details
                  </Link>
                </div>
                <button 
                  onClick={(e) => { e.preventDefault(); favorite ? removeFavorite('looks', look.id) : addFavorite('looks', look.id); }}
                  className={\`absolute top-4 right-4 p-2 rounded-full \${favorite ? 'bg-white/80' : 'bg-black/20 hover:bg-black/40'} backdrop-blur-md transition-colors\`}
                >
                  <Heart className={favorite ? "fill-red-500 text-red-500" : "text-white"} size={16} />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Lookbook;
  `,
  'src/pages/Packages.jsx': `
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { Clock, Tag } from 'lucide-react';

const Packages = () => {
  const { packages } = useContext(AppContext);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Curated Packages</h1>
          <p className="opacity-70 text-lg">Experience the ultimate pampering with our specially designed beauty packages offering exceptional value.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="glass rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-champagne text-white px-3 py-1 rounded text-sm font-bold shadow-lg">
                  Save ₹{pkg.totalValue - pkg.price}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
                <p className="opacity-70 text-sm mb-4">{pkg.description}</p>
                <div className="mb-6 flex-grow">
                  <h4 className="font-medium mb-2 text-sm uppercase tracking-wide opacity-80">Includes:</h4>
                  <ul className="space-y-2">
                    {pkg.servicesIncluded.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-champagne"></div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs line-through opacity-50">₹{pkg.totalValue}</span>
                    <span className="text-2xl font-bold text-champagne">₹{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-70 text-sm">
                    <Clock size={16} />
                    {pkg.duration} mins
                  </div>
                </div>
                <Button className="w-full">Book Package</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Packages;
  `,
  'src/pages/Memberships.jsx': `
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { Check } from 'lucide-react';

const Memberships = () => {
  const { memberships, membership, setMembership } = useContext(AppContext);

  const handleJoin = (mem) => {
    setMembership(mem);
    alert(\`Successfully activated \${mem.name} Membership!\`);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">SalonVerse Memberships</h1>
          <p className="opacity-70 text-lg">Unlock exclusive benefits, priority bookings, and significant savings with our premium membership tiers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((mem, i) => {
            const isPopular = i === 1;
            const isActive = membership?.id === mem.id;
            return (
              <div key={mem.id} className={\`relative glass rounded-2xl p-8 flex flex-col \${isPopular ? 'border-2 border-champagne scale-105 z-10' : ''}\`}>
                {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-champagne text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">MOST POPULAR</div>}
                
                <h3 className="text-2xl font-serif font-bold mb-2 text-center">{mem.name}</h3>
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold">₹{mem.price}</span>
                  <span className="opacity-70">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {mem.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="bg-champagne/20 p-1 rounded-full shrink-0"><Check size={14} className="text-champagne" /></div>
                      <span className="text-sm opacity-90">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={isActive ? 'ghost' : isPopular ? 'primary' : 'secondary'} 
                  className="w-full"
                  onClick={() => handleJoin(mem)}
                  disabled={isActive}
                >
                  {isActive ? 'Current Plan' : 'Join Now'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Memberships;
  `,
  'src/pages/Offers.jsx': `
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Tag, Calendar } from 'lucide-react';
import Button from '../components/common/Button';

const Offers = () => {
  const { offers } = useContext(AppContext);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Exclusive Offers</h1>
          <p className="opacity-70 text-lg">Limited time promotions to enhance your beauty journey.</p>
        </div>

        <div className="flex flex-col gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="glass rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between border-l-4 border-champagne">
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-serif font-bold">{offer.title}</h3>
                  <span className="px-3 py-1 bg-champagne/20 text-champagne rounded-full text-xs font-bold">{offer.discount}</span>
                </div>
                <p className="opacity-70 mb-4">{offer.description}</p>
                <div className="flex items-center gap-2 text-sm opacity-60 font-medium">
                  <Calendar size={14} /> {offer.validity}
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
                <div className="px-6 py-2 border border-dashed border-espresso/30 dark:border-white/30 rounded text-center text-sm font-mono tracking-widest bg-black/5 dark:bg-white/5">
                  {offer.code}
                </div>
                <Button>Book Offer</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Offers;
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Pages 4 created.");

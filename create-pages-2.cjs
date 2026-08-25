const fs = require('fs');
const path = require('path');

const files = {
  'src/pages/Home.jsx': `
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import ServiceCard from '../components/common/ServiceCard';

const Home = () => {
  const { services } = useContext(AppContext);
  const featuredServices = services.slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60 dark:opacity-40 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream/90 via-cream/50 to-transparent dark:from-espresso/90 dark:via-espresso/50 dark:to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              Your Beauty, <br/>
              <span className="text-champagne font-italic italic">Beautifully Designed.</span>
            </h1>
            <p className="text-lg md:text-xl opacity-80 mb-10 max-w-lg leading-relaxed">
              Discover exceptional beauty experiences, trusted professionals and effortless appointments—all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/services">
                <Button className="px-8 py-4 text-base">Book an Appointment</Button>
              </Link>
              <Link to="/lookbook">
                <Button variant="secondary" className="px-8 py-4 text-base">Explore Looks</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-espresso text-cream">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {[
              { num: '12K+', label: 'Happy Clients' },
              { num: '45+', label: 'Beauty Experts' },
              { num: '120+', label: 'Services' },
              { num: '4.9/5', label: 'Average Rating' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-4xl md:text-5xl font-serif text-champagne mb-2">{stat.num}</h3>
                <p className="text-sm uppercase tracking-widest opacity-80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Featured Services</h2>
              <p className="opacity-70 max-w-md">Experience our most popular treatments curated for your ultimate relaxation and beauty needs.</p>
            </div>
            <Link to="/services" className="hidden md:block text-champagne font-medium hover:underline underline-offset-4">
              View All Services
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
          <div className="mt-10 text-center md:hidden">
            <Link to="/services" className="text-champagne font-medium hover:underline underline-offset-4">
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
  `,
  'src/pages/Services.jsx': `
import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import ServiceCard from '../components/common/ServiceCard';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Services = () => {
  const { services } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sort, setSort] = useState('popular');

  const categories = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Spa', 'Bridal'];

  const filteredServices = services
    .filter(s => activeCategory === 'All' || s.category === activeCategory)
    .filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'price_low') return a.price - b.price;
      if (sort === 'price_high') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0; // popular
    });

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Services</h1>
          <p className="opacity-70 text-lg">Indulge in our comprehensive range of premium beauty and wellness treatments designed to elevate your style.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center mb-12">
          <div className="flex gap-2 overflow-x-auto w-full lg:w-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={\`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors \${
                  activeCategory === cat 
                    ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso' 
                    : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border border-black/5 dark:border-white/5'
                }\`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex w-full lg:w-auto gap-4">
            <div className="relative w-full lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" size={18} />
              <Input 
                placeholder="Search services..." 
                className="pl-10 py-2 w-full"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 rounded bg-transparent border border-black/10 dark:border-white/10 focus:outline-none"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="popular">Popular</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif mb-2">No services found</h3>
            <p className="opacity-70">Try adjusting your search or filters.</p>
            <Button variant="secondary" className="mt-6" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}>Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Services;
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Pages 2 created.");

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
                className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                    ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso' 
                    : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border border-black/5 dark:border-white/5'
                }`}
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
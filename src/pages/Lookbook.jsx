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
              className={`px-6 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat 
                  ? 'bg-espresso text-cream dark:bg-cream dark:text-espresso' 
                  : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border border-black/5 dark:border-white/5'
              }`}
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
                  <Link to={`/look/${look.id}`} className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded text-sm text-center font-medium transition-colors">
                    View Details
                  </Link>
                </div>
                <button 
                  onClick={(e) => { e.preventDefault(); favorite ? removeFavorite('looks', look.id) : addFavorite('looks', look.id); }}
                  className={`absolute top-4 right-4 p-2 rounded-full ${favorite ? 'bg-white/80' : 'bg-black/20 hover:bg-black/40'} backdrop-blur-md transition-colors`}
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
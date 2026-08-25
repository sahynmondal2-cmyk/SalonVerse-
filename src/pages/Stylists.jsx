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
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
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
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
    <Link to={`/service/${service.id}`} className="group flex flex-col glass rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
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
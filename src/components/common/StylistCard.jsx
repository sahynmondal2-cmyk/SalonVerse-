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
    <Link to={`/stylist/${stylist.id}`} className="group flex flex-col items-center p-6 glass rounded-xl hover:-translate-y-1 transition-all duration-300 text-center relative">
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
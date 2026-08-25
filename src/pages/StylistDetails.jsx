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
                  <img src={`https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400&h=400&sig=${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default StylistDetails;
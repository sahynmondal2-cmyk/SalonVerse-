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
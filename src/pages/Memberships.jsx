import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { Check } from 'lucide-react';

const Memberships = () => {
  const { memberships, membership, setMembership } = useContext(AppContext);

  const handleJoin = (mem) => {
    setMembership(mem);
    alert(`Successfully activated ${mem.name} Membership!`);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">SalonVerse Memberships</h1>
          <p className="opacity-70 text-lg">Unlock exclusive benefits, priority bookings, and significant savings with our premium membership tiers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {memberships.map((mem, i) => {
            const isPopular = i === 1;
            const isActive = membership?.id === mem.id;
            return (
              <div key={mem.id} className={`relative glass rounded-2xl p-8 flex flex-col ${isPopular ? 'border-2 border-champagne scale-105 z-10' : ''}`}>
                {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-champagne text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">MOST POPULAR</div>}
                
                <h3 className="text-2xl font-serif font-bold mb-2 text-center">{mem.name}</h3>
                <div className="text-center mb-8">
                  <span className="text-4xl font-bold">₹{mem.price}</span>
                  <span className="opacity-70">/month</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {mem.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="bg-champagne/20 p-1 rounded-full shrink-0"><Check size={14} className="text-champagne" /></div>
                      <span className="text-sm opacity-90">{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={isActive ? 'ghost' : isPopular ? 'primary' : 'secondary'} 
                  className="w-full"
                  onClick={() => handleJoin(mem)}
                  disabled={isActive}
                >
                  {isActive ? 'Current Plan' : 'Join Now'}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Memberships;
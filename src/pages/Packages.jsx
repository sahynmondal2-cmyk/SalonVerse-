import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';
import { Clock, Tag } from 'lucide-react';

const Packages = () => {
  const { packages } = useContext(AppContext);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Curated Packages</h1>
          <p className="opacity-70 text-lg">Experience the ultimate pampering with our specially designed beauty packages offering exceptional value.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="glass rounded-2xl overflow-hidden flex flex-col">
              <div className="h-48 relative">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-champagne text-white px-3 py-1 rounded text-sm font-bold shadow-lg">
                  Save ₹{pkg.totalValue - pkg.price}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-serif font-bold mb-2">{pkg.name}</h3>
                <p className="opacity-70 text-sm mb-4">{pkg.description}</p>
                <div className="mb-6 flex-grow">
                  <h4 className="font-medium mb-2 text-sm uppercase tracking-wide opacity-80">Includes:</h4>
                  <ul className="space-y-2">
                    {pkg.servicesIncluded.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-champagne"></div>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center justify-between mb-6 pt-4 border-t border-black/10 dark:border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs line-through opacity-50">₹{pkg.totalValue}</span>
                    <span className="text-2xl font-bold text-champagne">₹{pkg.price}</span>
                  </div>
                  <div className="flex items-center gap-1 opacity-70 text-sm">
                    <Clock size={16} />
                    {pkg.duration} mins
                  </div>
                </div>
                <Button className="w-full">Book Package</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Packages;
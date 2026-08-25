import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';

const LookDetails = () => {
  const { id } = useParams();
  const { lookbook, stylists } = useContext(AppContext);
  const look = lookbook.find(l => l.id === id);
  const stylist = stylists.find(s => s.id === look?.stylistId);

  if (!look) return <div className="pt-32 text-center">Look not found</div>;

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 rounded-2xl overflow-hidden h-[500px]">
             <img src={look.image} alt={look.title} className="w-full h-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center">
             <h1 className="text-4xl font-serif font-bold mb-2">{look.title}</h1>
             <p className="opacity-70 uppercase tracking-widest text-sm mb-6">{look.category}</p>
             
             {stylist && (
               <div className="flex items-center gap-4 mb-8 p-4 glass rounded-xl">
                 <img src={stylist.image} className="w-12 h-12 rounded-full object-cover" alt={stylist.name} />
                 <div>
                   <p className="text-xs opacity-70">Created by</p>
                   <Link to={`/stylist/${stylist.id}`} className="font-medium hover:text-champagne transition-colors">{stylist.name}</Link>
                 </div>
               </div>
             )}
             
             <div className="mb-8">
               <h3 className="font-serif text-xl mb-3">Products Used</h3>
               <ul className="list-disc list-inside opacity-80 space-y-1">
                 {look.productsUsed.map((p,i) => <li key={i}>{p}</li>)}
               </ul>
             </div>
             
             <Button className="w-full md:w-auto py-4">Recreate This Look</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LookDetails;
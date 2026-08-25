const fs = require('fs');
const path = require('path');

const files = {
  'src/pages/Login.jsx': `
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/common/Button';

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate(role === 'admin' ? '/admin' : '/customer');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="glass p-10 rounded-2xl max-w-md w-full text-center">
        <h1 className="text-3xl font-serif font-bold mb-2">Welcome Back</h1>
        <p className="opacity-70 mb-8">Choose your demo account to continue.</p>
        
        <div className="flex flex-col gap-4">
          <Button onClick={() => handleLogin('customer')} className="w-full py-4 text-base">
            Demo Customer Login
          </Button>
          <Button variant="secondary" onClick={() => handleLogin('admin')} className="w-full py-4 text-base">
            Demo Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Login;
  `,
  'src/pages/About.jsx': `
import React from 'react';

const About = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen text-center">
      <h1 className="text-4xl font-serif mb-4">About Us</h1>
      <p className="opacity-70 max-w-2xl mx-auto">SalonVerse is a premium destination for luxury beauty and wellness. We believe in providing exceptional experiences with top-tier professionals.</p>
    </div>
  );
};
export default About;
  `,
  'src/pages/Contact.jsx': `
import React from 'react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen text-center">
      <h1 className="text-4xl font-serif mb-4">Contact Us</h1>
      <p className="opacity-70 max-w-2xl mx-auto">Get in touch with our team for any queries or support.</p>
    </div>
  );
};
export default Contact;
  `,
  'src/pages/NotFound.jsx': `
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-7xl font-serif text-champagne mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6">Page Not Found</h2>
      <Link to="/"><Button>Return Home</Button></Link>
    </div>
  );
};
export default NotFound;
  `,
  'src/pages/LookDetails.jsx': `
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
                   <Link to={\`/stylist/\${stylist.id}\`} className="font-medium hover:text-champagne transition-colors">{stylist.name}</Link>
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
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Pages 5 created.");

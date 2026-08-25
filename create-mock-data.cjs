const fs = require('fs');
const path = require('path');

const writeData = (filename, data) => {
  fs.writeFileSync(path.join(__dirname, 'src/data', filename), `export default ${JSON.stringify(data, null, 2)};\n`);
};

// 1. Services (25+)
const categories = ['Hair', 'Skin', 'Nails', 'Makeup', 'Spa', 'Bridal'];
const services = [];
let serviceId = 1;

const serviceTemplates = {
  'Hair': ['Haircut', 'Hair Color', 'Balayage', 'Keratin', 'Hair Spa', 'Blow Dry', 'Hair Styling', 'Root Touch Up'],
  'Skin': ['Facial', 'Hydrafacial', 'Cleanup', 'Skin Polish', 'De-Tan', 'Anti-Aging Treatment'],
  'Nails': ['Manicure', 'Pedicure', 'Gel Nails', 'Nail Art', 'Nail Extension', 'Acrylic Nails'],
  'Makeup': ['Party Makeup', 'Bridal Makeup', 'Editorial Makeup', 'Light Makeup', 'Airbrush Makeup'],
  'Spa': ['Swedish Massage', 'Aroma Therapy', 'Deep Tissue Massage', 'Hot Stone Massage', 'Body Scrub'],
  'Bridal': ['Pre-Bridal Package', 'Bridal Makeup Package', 'Groom Package', 'Engagement Makeup']
};

Object.entries(serviceTemplates).forEach(([category, names]) => {
  names.forEach(name => {
    services.push({
      id: `srv_${serviceId++}`,
      name,
      category,
      description: `Experience our premium ${name.toLowerCase()} service tailored to your needs. Our experts ensure the highest quality results using premium products.`,
      duration: [30, 45, 60, 90, 120][Math.floor(Math.random() * 5)],
      price: [499, 999, 1499, 2999, 5999, 12999][Math.floor(Math.random() * 6)],
      rating: (Math.random() * 0.5 + 4.5).toFixed(1), // 4.5 to 5.0
      reviews: Math.floor(Math.random() * 200) + 10,
      image: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800` // Placeholder, can be better
    });
  });
});
writeData('services.js', services);

// 2. Stylists (12+)
const stylists = [];
const roles = ['Senior Stylist', 'Master Colorist', 'Skin Expert', 'Makeup Artist', 'Spa Therapist', 'Nail Technician'];
for(let i=1; i<=15; i++) {
  stylists.push({
    id: `sty_${i}`,
    name: `Stylist ${i}`,
    role: roles[i % roles.length],
    specialty: categories[i % categories.length],
    experience: `${Math.floor(Math.random() * 10) + 2} Years`,
    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
    reviews: Math.floor(Math.random() * 300) + 20,
    image: `https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=400`,
    bio: `A highly skilled professional with a passion for beauty and excellence. Specializing in ${categories[i % categories.length].toLowerCase()} to bring out the best in you.`
  });
}
writeData('stylists.js', stylists);

// 3. Packages (8+)
const packages = [];
const packageNames = ['Glow Package', 'Bridal Radiance', 'Hair Revival', 'Weekend Relaxation', 'Ultimate Makeover', 'Summer Ready', 'Winter Care', 'Signature Spa', 'Executive Grooming'];
packageNames.forEach((name, idx) => {
  packages.push({
    id: `pkg_${idx+1}`,
    name,
    description: `Complete ${name.toLowerCase()} experience for your ultimate satisfaction.`,
    servicesIncluded: [services[idx%services.length].name, services[(idx+1)%services.length].name],
    totalValue: 5000 + idx*1000,
    price: 3999 + idx*800,
    duration: 120 + (idx%3)*30,
    image: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800`
  });
});
writeData('packages.js', packages);

// 4. Memberships (3+)
const memberships = [
  { id: 'mem_1', name: 'Essential', price: 1999, benefits: ['10% off on all services', '1 Free Haircut/month', 'Priority Booking'] },
  { id: 'mem_2', name: 'Signature', price: 3999, benefits: ['20% off on all services', '1 Free Spa/month', 'Free Consultations', 'Priority Booking'] },
  { id: 'mem_3', name: 'Elite', price: 6999, benefits: ['30% off on all services', 'Unlimited free basic services', 'VIP Lounge access', 'Exclusive products'] }
];
writeData('memberships.js', memberships);

// 5. Offers (10+)
const offers = [];
for(let i=1; i<=12; i++) {
  offers.push({
    id: `off_${i}`,
    title: `Special Offer ${i}`,
    description: `Get amazing discounts on our premium services this season.`,
    discount: `${10 + (i%4)*10}% OFF`,
    validity: `Valid until end of ${['Month', 'Week', 'Season'][i%3]}`,
    code: `SAVE${10 + (i%4)*10}`
  });
}
writeData('offers.js', offers);

// 6. Lookbook (30+)
const lookbook = [];
const lbCategories = ['Trending', 'Bridal', 'Minimal', 'Glam', 'Hair', 'Nails', 'Makeup'];
for(let i=1; i<=35; i++) {
  lookbook.push({
    id: `look_${i}`,
    title: `Look ${i}`,
    category: lbCategories[i % lbCategories.length],
    stylistId: `sty_${(i % 15) + 1}`,
    image: `https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&q=80&w=600`,
    productsUsed: ['Premium Serum', 'Matte Finish Foundation', 'Argan Oil']
  });
}
writeData('lookbook.js', lookbook);

// 7. Customers (25+) & Appointments (30+)
const customers = [];
const appointments = [];
for(let i=1; i<=30; i++) {
  customers.push({
    id: `cust_${i}`,
    name: `Customer ${i}`,
    email: `customer${i}@example.com`,
    phone: `+91 98765432${i.toString().padStart(2, '0')}`,
    status: i%5 === 0 ? 'Inactive' : 'Active'
  });
  appointments.push({
    id: `apt_${i}`,
    customerId: `cust_${i}`,
    serviceId: `srv_${(i%30)+1}`,
    stylistId: `sty_${(i%15)+1}`,
    date: `2026-08-${(10 + (i%20)).toString().padStart(2, '0')}`,
    time: `1${i%5}:00 PM`,
    status: i%3 === 0 ? 'Completed' : i%4 === 0 ? 'Cancelled' : 'Upcoming',
    price: 1499 + (i%5)*500
  });
}
writeData('customers.js', customers);
writeData('appointments.js', appointments);

console.log("Mock data generated.");

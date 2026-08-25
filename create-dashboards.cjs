const fs = require('fs');
const path = require('path');

const files = {
  'src/pages/customer/Dashboard.jsx': `
import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Calendar, Heart, Award, User, LogOut } from 'lucide-react';
import Button from '../../components/common/Button';

// Subcomponents
const Overview = () => {
  const { user, appointments } = useContext(AppContext);
  const myApts = appointments.filter(a => a.status === 'Upcoming').length;
  
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6">Welcome, {user?.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass p-6 rounded-xl flex items-center justify-between">
          <div><p className="opacity-70 text-sm mb-1">Upcoming Appointments</p><h3 className="text-3xl font-bold">{myApts}</h3></div>
          <div className="p-3 bg-champagne/20 rounded-full text-champagne"><Calendar size={24} /></div>
        </div>
      </div>
    </div>
  );
};

const CustomerDashboard = () => {
  const { user, logout } = useContext(AppContext);
  const location = useLocation();

  if (!user || user.role !== 'customer') return <Navigate to="/login" />;

  const navItems = [
    { name: 'Overview', path: '/customer', icon: <User size={18} />, exact: true },
    { name: 'Appointments', path: '/customer/appointments', icon: <Calendar size={18} /> },
    { name: 'Favorites', path: '/customer/favorites', icon: <Heart size={18} /> },
    { name: 'Membership', path: '/customer/membership', icon: <Award size={18} /> }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black/5 dark:bg-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="glass rounded-xl p-4 flex flex-col gap-2">
            {navItems.map(item => {
              const active = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={\`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors \${active ? 'bg-champagne text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'}\`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-500/10 mt-auto text-left transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/appointments" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">My Appointments</h2><p>List of appointments here.</p></div>} />
            <Route path="/favorites" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">My Favorites</h2><p>Saved items here.</p></div>} />
            <Route path="/membership" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">My Membership</h2><p>Membership details here.</p></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default CustomerDashboard;
  `,
  'src/pages/admin/Dashboard.jsx': `
import React, { useContext } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { LayoutDashboard, Calendar, Scissors, Users, Tag, BarChart3, Settings, LogOut } from 'lucide-react';

const AdminOverview = () => {
  const { appointments, customers, services } = useContext(AppContext);
  const todayApts = appointments.filter(a => a.status === 'Upcoming').length; // Simplified
  
  return (
    <div>
      <h2 className="text-3xl font-serif mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Today's Appointments", value: todayApts, icon: <Calendar /> },
          { label: "Total Customers", value: customers.length, icon: <Users /> },
          { label: "Active Services", value: services.length, icon: <Scissors /> },
          { label: "Monthly Revenue", value: "₹45,200", icon: <BarChart3 /> }
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-xl flex items-center justify-between">
            <div>
              <p className="opacity-70 text-sm mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className="p-3 bg-champagne/20 rounded-full text-champagne">{stat.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useContext(AppContext);
  const location = useLocation();

  if (!user || user.role !== 'admin') return <Navigate to="/login" />;

  const navItems = [
    { name: 'Overview', path: '/admin', icon: <LayoutDashboard size={18} />, exact: true },
    { name: 'Appointments', path: '/admin/appointments', icon: <Calendar size={18} /> },
    { name: 'Services', path: '/admin/services', icon: <Scissors size={18} /> },
    { name: 'Customers', path: '/admin/customers', icon: <Users size={18} /> },
    { name: 'Offers', path: '/admin/offers', icon: <Tag size={18} /> },
    { name: 'Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> }
  ];

  return (
    <div className="pt-24 pb-20 min-h-screen bg-black/5 dark:bg-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="glass rounded-xl p-4 flex flex-col gap-2">
            {navItems.map(item => {
              const active = item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);
              return (
                <Link 
                  key={item.name} 
                  to={item.path}
                  className={\`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors \${active ? 'bg-champagne text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'}\`}
                >
                  {item.icon} {item.name}
                </Link>
              );
            })}
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-red-500 hover:bg-red-500/10 mt-10 text-left transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/appointments" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">Manage Appointments</h2></div>} />
            <Route path="/services" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">Manage Services</h2></div>} />
            <Route path="/customers" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">Manage Customers</h2></div>} />
            <Route path="/offers" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">Manage Offers</h2></div>} />
            <Route path="/analytics" element={<div className="glass p-8 rounded-xl"><h2 className="text-2xl font-serif mb-6">Analytics & Reports</h2></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboard;
  `
};

Object.entries(files).forEach(([filepath, content]) => {
  fs.writeFileSync(path.join(__dirname, filepath), content.trim());
});

console.log("Dashboards created.");

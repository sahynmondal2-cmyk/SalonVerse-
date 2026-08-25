import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Stylists from './pages/Stylists';
import StylistDetails from './pages/StylistDetails';
import Lookbook from './pages/Lookbook';
import LookDetails from './pages/LookDetails';
import Packages from './pages/Packages';
import Memberships from './pages/Memberships';
import Offers from './pages/Offers';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import CustomerDashboard from './pages/customer/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';

import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/SalonVerse-/">
      <div className="min-h-screen flex flex-col selection:bg-champagne selection:text-white">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/stylists" element={<Stylists />} />
            <Route path="/stylist/:id" element={<StylistDetails />} />
            <Route path="/lookbook" element={<Lookbook />} />
            <Route path="/look/:id" element={<LookDetails />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/memberships" element={<Memberships />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/customer/*" element={<CustomerDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
    </ErrorBoundary>
  );
}
export default App;
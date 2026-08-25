import React, { createContext, useState, useEffect } from 'react';
import servicesData from '../data/services.js';
import stylistsData from '../data/stylists.js';
import appointmentsData from '../data/appointments.js';
import packagesData from '../data/packages.js';
import membershipsData from '../data/memberships.js';
import offersData from '../data/offers.js';
import lookbookData from '../data/lookbook.js';
import customersData from '../data/customers.js';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null); // null, { role: 'customer' | 'admin', name: 'Demo' }
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem('favorites')) || { services: [], stylists: [], looks: [] });
  const [appointments, setAppointments] = useState(() => JSON.parse(localStorage.getItem('appointments')) || appointmentsData);
  const [membership, setMembership] = useState(() => JSON.parse(localStorage.getItem('membership')) || null);
  
  // Admin state
  const [services, setServices] = useState(servicesData);
  const [stylists, setStylists] = useState(stylistsData);
  const [packages, setPackages] = useState(packagesData);
  const [offers, setOffers] = useState(offersData);
  const [lookbook, setLookbook] = useState(lookbookData);

  const [memberships, setMemberships] = useState(membershipsData);
  const [customers, setCustomers] = useState(customersData);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('membership', JSON.stringify(membership));
  }, [membership]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const addFavorite = (type, id) => {
    setFavorites(prev => ({ ...prev, [type]: [...prev[type], id] }));
  };

  const removeFavorite = (type, id) => {
    setFavorites(prev => ({ ...prev, [type]: prev[type].filter(item => item !== id) }));
  };

  const isFavorite = (type, id) => favorites[type].includes(id);

  const login = (role) => {
    setUser({ role, name: role === 'admin' ? 'Admin User' : 'Demo Customer' });
  };
  
  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{
      theme, toggleTheme,
      user, login, logout,
      favorites, addFavorite, removeFavorite, isFavorite,
      appointments, setAppointments,
      membership, setMembership,
      memberships, setMemberships,
      customers, setCustomers,
      services, setServices,
      stylists, setStylists,
      packages, setPackages,
      offers, setOffers,
      lookbook, setLookbook
    }}>
      {children}
    </AppContext.Provider>
  );
};

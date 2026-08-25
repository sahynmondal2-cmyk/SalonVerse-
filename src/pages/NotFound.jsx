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
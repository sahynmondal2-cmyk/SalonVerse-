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
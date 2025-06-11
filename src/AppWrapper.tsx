// src/AppWrapper.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500); // Simulated delay
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <Preloader />}
      {children}
    </>
  );
};

export default AppWrapper;

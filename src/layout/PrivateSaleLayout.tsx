// src/layouts/PrivateSaleLayout.tsx
import { Outlet } from 'react-router-dom';
import PrivateLandingPage from '../privateSalepages/PrivateLandingPage';

function PrivateSaleLayout() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Landing Page content (banner/header etc.) */}
      {/* <PrivateLandingPage /> */}

      {/* Nested dashboard area */}
      <Outlet />
    </div>
  );
}

export default PrivateSaleLayout;

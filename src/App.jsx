import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ChampTrade from './pages/ChampTrade';
import WebLayout from './layout/WebLayout';
import AppWrapper from './AppWrapper';

// ChampTrade dashboard pages
import LandingPage from './ChampTradepages/LandingPage';
import DashboardOverviewPage from './ChampTradepages/DashboardOverviewPage';
import MyEarningsPage from './ChampTradepages/MyEarningsPage';
import MyTeamPage from './ChampTradepages/MyTeamPage';
import MyReferralsPage from './ChampTradepages/MyReferralsPage';
import ReinvestmentCyclesPage from './ChampTradepages/ReinvestmentCyclesPage';
import ClaimWithdrawPage from './ChampTradepages/ClaimWithdrawPage';
import BuyTccPage from './ChampTradepages/BuyTccPage';
import SupportTicketsPage from './ChampTradepages/SupportTicketsPage';
import HelpCenterPage from './ChampTradepages/HelpCenterPage';
import SettingsPage from './ChampTradepages/SettingsPage';
import Faq from './champtradeComponent/dashboard/Faq';
import Reward from './champtradeComponent/dashboard/Reward';
import DashboardPage from './ChampTradepages/DashboardPage';

// Private Sale pages
import PrivateLandingPage from './privateSalepages/PrivateLandingPage';
import { DashboardLayout } from './privateSaleComponents/DashboardLayout';
import PrivateSaleLayout from './layout/PrivateSaleLayout';

// Wallet connect and state management
import { WagmiProvider } from 'wagmi';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { projectId, metadata, networks, wagmiAdapter } from './config';

import './index.css';
import ViewUser from './pages/ViewUser';
import RegisterNewUser from './pages/RegisterNewUser';
import StartChampTrade from './champtradeComponent/dashboard/StartChampTrade';

// Setup for React Query
const queryClient = new QueryClient();

// Wallet Connect config
const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: 'light', // ✅ Fix the type here
  themeVariables: {
    '--w3m-accent': '#000000',
  },
};
// Initialize AppKit
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true,
  },
});

// Keyframes for global use
const floatKeyframes = `
@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(10px); }
  50% { transform: translateY(0) translateX(20px); }
  75% { transform: translateY(10px) translateX(10px); }
  100% { transform: translateY(0) translateX(0); }
}
`;

function App() {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = floatKeyframes;
    document.head.appendChild(style);

    document.title = 'TCC 2.0 | The Evolution of Digital Earning';

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative overflow-hidden">
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <ScrollToTop />
            <AppWrapper>
              <Routes>

                {/* Public Website Layout */}
                <Route path="/" element={<WebLayout />}>
                  <Route index element={<HomePage />} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="services" element={<ServicesPage />} />
                  <Route path="contact" element={<ContactPage />} />
                  <Route path="champ-trade" element={<ChampTrade />} />
                </Route>

                {/* Champ Trade Dashboard */}
                <Route path="/go-dashboard" element={<LandingPage />} />
                <Route path="/view-user" element={<ViewUser />} />
                <Route path="/RegisterNewUser" element={<RegisterNewUser />} />
                <Route path="/champ-trade-dashboard" element={<DashboardPage />}>

                
                  <Route index element={<DashboardOverviewPage />} />
                  <Route path="StartChampTrade" element={<StartChampTrade />} />
                  <Route path="my-earnings" element={<MyEarningsPage />} />
                  <Route path="my-team" element={<MyTeamPage />} />
                  <Route path="my-referrals" element={<MyReferralsPage />} />
                  <Route path="reinvestment" element={<ReinvestmentCyclesPage />} />
                  <Route path="withdraw" element={<ClaimWithdrawPage />} />
                  <Route path="buy-tokens" element={<BuyTccPage />} />
                  <Route path="support" element={<SupportTicketsPage />} />
                  <Route path="faq" element={<Faq />} />
                  <Route path="help" element={<HelpCenterPage />} />
                  <Route path="reward" element={<Reward />} />
                  <Route path="settings" element={<SettingsPage />} />
                </Route>

                {/* Private Sale Dashboard */}
                <Route path="/private-sale-dashboard" element={<PrivateSaleLayout />}>
                  <Route index element={<PrivateLandingPage />} />
                  <Route path="private-dashboard" element={<DashboardLayout />} />
                </Route>

              </Routes>
            </AppWrapper>
          </QueryClientProvider>
        </WagmiProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;

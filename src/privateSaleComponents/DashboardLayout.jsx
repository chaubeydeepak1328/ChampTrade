


import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Coins,
  Share2,
  User,
  Trophy,
  HelpCircle,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { BuyTokens } from './BuyTokens';
import { ReferralSystem } from './ReferralSystem';
import { UserStats } from './UserStats';
import { Leaderboard } from './Leaderboard';
import { FAQSection } from './FAQSection';
import { Overview } from './Overview';
// import { useWallet } from '../PrivateSaleHooks/useWallet';
import LogoChamp from '../images/LogoChamp.png'


const MENU_ITEMS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'buy', label: 'Buy Tokens', icon: Coins },
  { id: 'referral', label: 'Referral Program', icon: Share2 },
  { id: 'stats', label: 'User Stats', icon: User },
  { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const shortenAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function DashboardLayout() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const { address, disconnect } = useWallet();

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'buy':
        return <BuyTokens />;
      case 'referral':
        return <ReferralSystem userAddress={address ?? undefined} />;
      case 'stats':
        // return <UserStats address={address ?? undefined} />;
        return <UserStats
          address={address ?? undefined}
          stats={{
            totalBought: 0,
            tier1Rewards: 0,
            tier2Rewards: 0,
            directReferrals: 0,
          }}
        />
          ;
      case 'leaderboard':
        return <Leaderboard />;
      case 'faq':
        return <FAQSection />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#161818] border-b border-amber-500/20 h-16 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold text-yellow-500">
            <img src={LogoChamp} alt="#" className='h-12' />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-yellow-500">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="flex items-center gap-4">
          {address ? (
            <>
              <span className="hidden sm:block text-yellow-500 font-mono">{shortenAddress(address)}</span>
              <button onClick={disconnect} className="bg-amber-500/20 hover:bg-amber-500/30 px-3 py-2 rounded-lg text-yellow-500 flex items-center">
                <LogOut size={18} className="sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <button className="bg-amber-500 text-black px-4 py-2 rounded-lg hover:bg-amber-600">Connect Wallet</button>
          )}
        </div>
      </header>

      {/* Sidebar Desktop */}
      <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-black border-r border-amber-500/20 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeSection === id ? 'bg-amber-500/20 text-yellow-500' : 'hover:bg-amber-500/10 text-white'
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Sidebar Mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden">
          <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-black border-r border-amber-500/20 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {MENU_ITEMS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => {
                    setActiveSection(id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition ${activeSection === id ? 'bg-amber-500/20 text-yellow-500' : 'hover:bg-amber-500/10 text-white'
                    }`}
                >
                  <Icon size={18} />
                  {label}
                </button>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="md:ml-64 pt-20 px-4 pb-10">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}

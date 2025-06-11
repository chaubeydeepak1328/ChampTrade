
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, DollarSign, Users, GitFork, 
  RefreshCw, Wallet as WalletIcon, Coins,  
  HelpCircle, Settings, Menu, X, Trophy, Clock, LogIn, LogOut 
} from 'lucide-react';
import { useState, useEffect } from 'react';

function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuSections = [
    {
      title: 'Overview',
      items: [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/champ-trade-dashboard' }
      ]
    },
    {
      title: 'Earnings & Team',
      items: [
        { icon: DollarSign, label: 'My Earnings', path: '/champ-trade-dashboard/my-earnings' },
        { icon: Users, label: 'My Team', path: '/champ-trade-dashboard/my-team' },
        { icon: GitFork, label: 'My Referrals', path: '/champ-trade-dashboard/my-referrals' }
      ]
    },
    {
      title: 'Investment',
      items: [
        { icon: RefreshCw, label: 'My Champ Trade', path: '/champ-trade-dashboard/reinvestment' },
        { icon: WalletIcon, label: 'Claim', path: '/champ-trade-dashboard/withdraw' },
        { icon: Coins, label: 'Buy TCC 2.O', path: '/champ-trade-dashboard/buy-tokens' },
        { icon: HelpCircle, label: 'Faq', path: '/champ-trade-dashboard/Faq' },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: Trophy, label: 'Reward', path: '/champ-trade-dashboard/reward' },
        { icon: Settings, label: 'Profile', path: '/champ-trade-dashboard/settings' }
      ]
    }
  ];

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const handleConnectWallet = () => {
    setWalletConnected(!walletConnected);
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          ${isMobile ? 'w-[280px]' : 'w-64'} 
          bg-dark-green-light border-r border-golden/20 h-screen flex flex-col
          ${isMobile ? 'fixed top-0 z-40' : 'sticky top-0 z-30'}
          transition-all duration-300 ease-in-out
          ${isMobile ? (isOpen ? 'left-0' : '-left-[280px]') : 'left-0'}
        `}
      >
        {/* Close button for mobile */}
        {isMobile && (
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-golden hover:text-golden-dark transition-colors"
          >
            <X size={24} />
          </button>
        )}

        <nav className="pt-4 p-4 flex-1 overflow-y-auto scrollbar-hide">
          {/* Mobile Header Content */}
          {isMobile && (
            <div className="mb-6 pb-6 border-b border-golden/20">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xl font-bold text-golden">CHAMP <span className='text-white'>TRADE</span></span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-golden" />
                  <span className="text-sm text-golden-white">Cycle: 1 (163 days left)</span>
                </div>
                
                {walletConnected && (
                  <div className="flex items-center gap-2">
                    <WalletIcon className="h-5 w-5 text-golden" />
                    <span className="text-sm text-golden-white">0x1234...5678</span>
                  </div>
                )}
                
                <button 
                  onClick={handleConnectWallet}
                  className="w-full bg-golden text-dark-green px-4 py-2 rounded-lg hover:bg-golden-dark transition-colors"
                >
                  {walletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
                </button>
              </div>
            </div>
          )}

          {/* Menu Sections */}
          <div className="space-y-6">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-6">
                <h3 className="text-xs font-semibold text-golden uppercase tracking-wider px-4 mb-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map(({ icon: Icon, label, path }) => {
                    const isActive = pathname.startsWith(path);
                    return (
                      <li key={path}>
                        <Link
                          to={path}
                          onClick={() => isMobile && setIsOpen(false)}
                          className={`
                            flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm
                            ${isActive
                              ? 'bg-golden/90 text-dark-green font-medium'
                              : 'text-golden-white hover:bg-dark-green-dark/80'}
                          `}
                        >
                          <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 2} />
                          <span>{label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Login/Logout section at bottom */}
        <div className="p-4 border-t border-golden/20">
          <button 
            onClick={toggleLogin}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-golden/10 hover:bg-golden/20 text-golden transition-colors"
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </>
            ) : (
              <>
                <LogIn className="h-5 w-5" />
                <span>Log In</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile overlay and toggle button - only shown when sidebar is closed */}
      {!isOpen && isMobile && (
        <button 
          onClick={() => setIsOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-dark-green-dark text-golden border border-golden/30"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Mobile overlay - only shown when sidebar is open */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
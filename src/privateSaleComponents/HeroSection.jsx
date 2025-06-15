import { Rocket, FileText, TrendingUp, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="text-center py-16 bg-black text-white">
      <p className="text-5xl font-bold mb-6 sm:text-md">
        Secure Your Future with TCC2.0
      </p> 
      <p className="text-lg sm:text-md mb-8 max-w-xl mx-auto leading-relaxed">
        Join the presale, earn bonuses through referrals, and become part of a growing decentralized economy.
      </p>
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap p-5">
  {/* Row 1 */}
  <div className="w-[calc(50%-6px)] sm:w-auto ">
    <button className="w-full flex items-center justify-center px-3 py-3 sm:px-6 sm:py-3 bg-yellow-500 hover:bg-amber-600 rounded-lg font-semibold transition-colors">
      <Rocket className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap text-sm sm:text-base">Buy Tokens</span>
    </button>
  </div>
  
  {/* Other buttons follow same pattern */}
  <div className="w-[calc(50%-6px)] sm:w-auto">
    <button className="w-full flex items-center justify-center px-3 py-3 sm:px-6 sm:py-3 bg-transparent border-2 border-yellow-500 hover:bg-amber-500/10 rounded-lg font-semibold transition-colors">
      <TrendingUp className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap text-sm sm:text-base">View Tokenomics</span>
    </button>
  </div>

  {/* Row 2 */}
  <div className="w-[calc(50%-6px)] sm:w-auto">
    <button className="w-full flex items-center justify-center px-3 py-3 sm:px-6 sm:py-3 bg-transparent border-2 border-yellow-500 hover:bg-amber-500/10 rounded-lg font-semibold transition-colors">
      <FileText className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap text-sm sm:text-base">Read Whitepaper</span>
    </button>
  </div>
  
  <div className="w-[calc(50%-6px)] sm:w-auto">
    <button 
      onClick={() => navigate('/Private-sale-dashboard/private-dashboard')}
      className="w-full flex items-center justify-center px-3 py-3 sm:px-6 sm:py-3 bg-yellow-500 hover:bg-amber-600 rounded-lg font-semibold transition-colors"
    >
      <LayoutDashboard className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap text-sm sm:text-base">Dashboard</span>
    </button>
  </div>
</div>
    </section>
  );
}
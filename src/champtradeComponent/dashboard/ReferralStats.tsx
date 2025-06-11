// import React from 'react';
// import { Users, ChevronRight } from 'lucide-react';

// interface ReferralLevel {
//   level: string;
//   walletAddress: string;
//   isActive: boolean;
//   dailyContribution: number;
//   totalReferrals: number;
// }

// const ReferralStats: React.FC = () => {
//   const referralLevels: ReferralLevel[] = [
//     { level: 'L1', walletAddress: '0x1234...5678', isActive: true, dailyContribution: 0.20, totalReferrals: 5 },
//     { level: 'L2', walletAddress: '0x8765...4321', isActive: true, dailyContribution: 1.00, totalReferrals: 25 },
//     { level: 'L3', walletAddress: '0xabcd...efgh', isActive: true, dailyContribution: 5.00, totalReferrals: 125 },
//     { level: 'L4', walletAddress: '0xijkl...mnop', isActive: false, dailyContribution: 0, totalReferrals: 0 },
//     { level: 'L5', walletAddress: '0xqrst...uvwx', isActive: false, dailyContribution: 0, totalReferrals: 0 },
//     { level: 'L6', walletAddress: '0xyzab...cdef', isActive: false, dailyContribution: 0, totalReferrals: 0 },
//   ];

//   return (
//     <div className="bg-[rgb(20,20,20)] rounded-xl p-2 border-2 border-yellow-500/30 hover:shadow-[0_0_20px_rgb(250,204,21,0.1)] transition-all duration-300">
//       <div className="flex items-center gap-3 mb-6">
//         <div className="w-10 h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
//           <Users className="w-5 h-5 text-yellow-500" />
//         </div>
//         <h2 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
//           Referral Statistics
//         </h2>
//       </div>

//       <div className="space-y-4">
//         {referralLevels.map((level) => (
//           <div
//             key={level.level}
//             className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-xl p-4 border-2 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all duration-300"
//           >
//             <div className="flex items-center justify-between mb-3">
//               <span className="text-yellow-500 font-bold text-lg">{level.level}</span>
//               <ChevronRight className="w-5 h-5 text-yellow-500" />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-neutral-400 text-sm">Wallet</p>
//                 <p className="text-white font-medium">{level.walletAddress}</p>
//               </div>
//               <div>
//                 <p className="text-neutral-400 text-sm">Status</p>
//                 <p className={`font-medium ${level.isActive ? "text-green-400" : "text-red-400"}`}>
//                   {level.isActive ? "Active" : "Inactive"}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-neutral-400 text-sm">Daily Contribution</p>
//                 <p className="text-yellow-500 font-bold">${level.dailyContribution.toFixed(2)}</p>
//               </div>
//               <div>
//                 <p className="text-neutral-400 text-sm">Total Referrals</p>
//                 <p className="text-white font-bold">{level.totalReferrals}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="mt-6 p-5 bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-xl border-2 border-yellow-500/20">
//         <div className="grid grid-cols-2 gap-4 text-center">
//           <div>
//             <p className="text-neutral-400 text-sm">Total Active Referrals</p>
//             <p className="text-2xl font-bold text-yellow-500">155</p>
//           </div>
//           <div>
//             <p className="text-neutral-400 text-sm">Total Daily Earnings</p>
//             <p className="text-2xl font-bold text-yellow-500">$6.20</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReferralStats;

import React, { useState } from 'react';
import { Users, ChevronRight, ChevronLeft, Table } from 'lucide-react';

interface ReferralLevel {
  level: string;
  walletAddress: string;
  isActive: boolean;
  dailyContribution: number;
  totalReferrals: number;
}

const ReferralStats: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<ReferralLevel | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const referralLevels: ReferralLevel[] = [
    { level: 'L1', walletAddress: '0x1234...5678', isActive: true, dailyContribution: 0.20, totalReferrals: 5 },
    { level: 'L2', walletAddress: '0x8765...4321', isActive: true, dailyContribution: 1.00, totalReferrals: 25 },
    { level: 'L3', walletAddress: '0xabcd...efgh', isActive: true, dailyContribution: 5.00, totalReferrals: 125 },
    { level: 'L4', walletAddress: '0xijkl...mnop', isActive: false, dailyContribution: 0, totalReferrals: 0 },
    { level: 'L5', walletAddress: '0xqrst...uvwx', isActive: false, dailyContribution: 0, totalReferrals: 0 },
    { level: 'L6', walletAddress: '0xyzab...cdef', isActive: false, dailyContribution: 0, totalReferrals: 0 },
  ];

  const handleLevelClick = (level: ReferralLevel) => {
    setSelectedLevel(level);
    setViewMode('table');
  };

  const handleBackClick = () => {
    setViewMode('cards');
    setSelectedLevel(null);
  };

  return (
    <div className="bg-[rgb(20,20,20)] rounded-xl p-3 sm:p-6 border-2 border-yellow-500/30 hover:shadow-[0_0_20px_rgb(250,204,21,0.1)] transition-all duration-300">
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-500/20 to-amber-400/20 rounded-full flex items-center justify-center">
          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
        </div>
        <h2 className="text-base sm:text-xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
          Referral Stats
        </h2>
        {viewMode === 'table' && (
          <button 
            onClick={handleBackClick}
            className="ml-auto flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-1 rounded-lg bg-gradient-to-br from-yellow-500/20 to-amber-400/20 hover:from-yellow-500/30 hover:to-amber-400/30 transition-all text-yellow-500 text-xs sm:text-sm"
          >
            <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Back</span>
          </button>
        )}
      </div>

      {viewMode === 'cards' ? (
        <div className="space-y-3 sm:space-y-4">
          {referralLevels.map((level) => (
            <div
              key={level.level}
              className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-[0_0_10px_rgb(250,204,21,0.1)] transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <span className="text-yellow-500 font-bold text-sm sm:text-lg">{level.level}</span>
                <button 
                  onClick={() => handleLevelClick(level)}
                  className="p-1 rounded-full hover:bg-yellow-500/10 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Wallet</p>
                  <p className="text-white font-medium text-xs sm:text-sm truncate">{level.walletAddress}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Status</p>
                  <p className={`font-medium text-xs sm:text-sm ${level.isActive ? "text-green-400" : "text-red-400"}`}>
                    {level.isActive ? "Active" : "Inactive"}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Daily Contribution</p>
                  <p className="text-yellow-500 font-bold text-xs sm:text-sm">${level.dailyContribution.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Total Referrals</p>
                  <p className="text-white font-bold text-xs sm:text-sm">{level.totalReferrals}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-yellow-500/20">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Table className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
            <h3 className="text-sm sm:text-lg font-bold text-yellow-500">{selectedLevel?.level} Referrals</h3>
          </div>
          
          <div className="relative">
            <div className="overflow-x-auto pb-2 -mx-1 sm:mx-0">
              <table className="w-full min-w-[200px] overflow-x-auto">
                <thead>
                  <tr className="border-b border-yellow-500/20">
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">ID</th>
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Wallet</th>
                    <th className="text-left py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Date</th>
                    <th className="text-right py-2 px-2 text-yellow-500 font-medium text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: selectedLevel?.totalReferrals || 0 }).map((_, index) => (
                    <tr key={index} className="border-b border-yellow-500/10 hover:bg-yellow-500/5 transition-colors">
                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">REF-{selectedLevel?.level}-{index + 1}</td>
                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap truncate max-w-[80px] xs:max-w-[100px] sm:max-w-none">
                        0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}
                      </td>
                      <td className="py-2 px-2 text-white text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">
                        {new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-2 px-2 text-right text-yellow-500 text-[10px] xs:text-xs sm:text-sm whitespace-nowrap">
                        ${(Math.random() * 0.5 + 0.1).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                  {(!selectedLevel?.totalReferrals || selectedLevel.totalReferrals === 0) && (
                    <tr>
                      <td colSpan={4} className="py-3 text-center text-neutral-400 text-xs sm:text-sm">No referrals found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="md:hidden absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[rgb(30,30,30)] to-transparent pointer-events-none"></div>
          </div>
          
          <p className="md:hidden text-[10px] xs:text-xs text-yellow-500/70 mt-1 text-center">
            Scroll horizontally to view all columns →
          </p>
        </div>
      )}

      <div className="mt-4 sm:mt-6 p-3 sm:p-5 bg-gradient-to-br from-[rgb(30,30,30)] to-[rgb(20,20,20)] rounded-lg sm:rounded-xl border-2 border-yellow-500/20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
          <div>
            <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Active Referrals</p>
            <p className="text-lg sm:text-2xl font-bold text-yellow-500">155</p>
          </div>
          <div>
            <p className="text-neutral-400 text-[10px] xs:text-xs sm:text-sm">Daily Earnings</p>
            <p className="text-lg sm:text-2xl font-bold text-yellow-500">$6.20</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralStats;
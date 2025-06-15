// import React from 'react';
// import { Clock, RefreshCw } from 'lucide-react';

// const PlanProgress = () => {
//   const progress = 66.66; // Example progress value
//   const daysRemaining = 163;

//   return (
//     <div className="bg-[rgb(20,20,20)]  rounded-xl p-4 sm:p-6 shadow-lg border border-yellow-500/20 mx-2 sm:mx-0">
//     <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
//       <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
//       Plan & Reinvestment Progress
//     </h3>

//     <div className="space-y-4 sm:space-y-6">
//       {/* Progress Bar */}
//       <div>
//         <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-1 sm:mb-2">
//           <span>Progress to Reinvestment</span>
//           <span>${progress.toFixed(2)} / $100.00</span>
//         </div>
//         <div className="h-3 sm:h-4 bg-[rgb(20,20,20)] border border-yellow-500 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//       </div>

//       {/* Time Remaining */}
//       <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-300">
//         <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
//         <span>{daysRemaining} days remaining in current cycle</span>
//       </div>

//       {/* Milestones - Stack on mobile */}
//       <div className="space-y-2 sm:space-y-3">
//         <h4 className="text-white font-semibold text-sm sm:text-base">Reinvestment Milestones</h4>
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
//           <div className="text-center p-2 bg-[rgb(20,20,20)] border border-yellow-500  rounded-lg">
//             <div className="text-yellow-500 font-bold text-sm sm:text-base">Year 1</div>
//             <div className="text-xs sm:text-sm text-gray-400">$33.33</div>
//           </div>
//           <div className="text-center p-2 bg-[rgb(20,20,20)] border border-yellow-500  rounded-lg">
//             <div className="text-yellow-500 font-bold text-sm sm:text-base">Year 2</div>
//             <div className="text-xs sm:text-sm text-gray-400">$66.66</div>
//           </div>
//           <div className="text-center p-2 bg-[rgb(20,20,20)]  border border-yellow-500 rounded-lg">
//             <div className="text-yellow-500 font-bold text-sm sm:text-base">Year 3</div>
//             <div className="text-xs sm:text-sm text-gray-400">$100.00</div>
//           </div>
//         </div>
//       </div>

//       {/* Auto-Reinvestment Note */}
//       <div className="text-xs sm:text-sm text-gray-400 bg-[rgb(20,20,20)]  border border-yellow-500 p-3 sm:p-4 rounded-lg">
//         <p>Your plan will automatically reinvest when you reach $100 in reserve.</p>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default PlanProgress;


import { useState } from 'react';
import { Clock, RefreshCw, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';
import { Coins, TrendingUp } from 'lucide-react';

const PlanProgress = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const progress = 66.66;
  const daysRemaining = 163;
  const transactionHistory = [
    { id: 1, type: 'Deposit', amount: '100 TCC', date: '2023-05-15', status: 'Completed' },
    { id: 2, type: 'Withdrawal', amount: '50 TCC', date: '2023-05-10', status: 'Completed' },
    { id: 3, type: 'Reinvestment', amount: '33.33 TCC', date: '2023-05-01', status: 'Pending' },
    { id: 4, type: 'Bonus', amount: '10 TCC', date: '2023-04-28', status: 'Completed' },
  ];

  const handleStartTrade = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <>
      {/* Stylish Centered Flash Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-4 flex items-center justify-center pointer-events-none">
          <div className="animate-fade-in-up bg-gradient-to-br from-yellow-800 to-yellow-700 text-white px-4 py-4 sm:px-8 sm:py-6 rounded-xl shadow-2xl border-2 border-yellow-500/20 transform transition-all duration-300 flex items-center gap-3 sm:gap-4 w-full max-w-md mx-auto">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-200 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold mb-0.5 sm:mb-1 truncate">Trade Started!</h3>
              <p className="text-yellow-100 text-sm sm:text-base truncate">Your Champ Trade has been successfully initiated</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-yellow-200 hover:text-white transition-colors pointer-events-auto"
            >
              <X size={18} className="sm:w-5" />
            </button>
          </div>
        </div>
      )}

      {/* <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
      `}</style> */}
      <style>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.5s ease-out forwards;
  }
`}</style>


      <div className="bg-[rgb(20,20,20)] rounded-xl mb-5 p-4 sm:p-6 shadow-lg border border-yellow-500/20 mx-2 sm:mx-0">
        <p className='text-yellow-500 font-2xl font-bold mb-4'>Start Quick Trade</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Current Price Card */}
          <div className="bg-[rgba(20,20,20,0.8)] border border-yellow-500/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Current Price (TCC)</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">$0.01</div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>+5.2% (24h)</span>
            </div>
          </div>

          {/* Available TCC Card */}
          <div className="bg-[rgba(20,20,20,0.8)] border border-yellow-500/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-white">Available TCC</h3>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">1,250.50</div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-4 w-4" />
              <span>+3.8% (24h)</span>
            </div>
          </div>
        </div>

        <div className="bg-[rgba(20,20,20,0)] mt-5 border border-yellow-500/50 p-6 rounded-lg ">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Trade</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
                <p className="text-sm text-gray-400 mb-1">You Pay</p>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="text-lg font-bold w-20 focus:outline-none bg-transparent text-white"
                    placeholder="$110" disabled
                  />
                  <span className="text-gray-400">TCC</span>
                </div>
              </div>
              <div className="p-4 bg-[rgba(20,20,20,0)] border border-yellow-500/50 rounded-lg ">
                <p className="text-sm text-gray-400 mb-1">Required TCC</p>
                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    className="text-lg font-bold w-20 focus:outline-none bg-transparent text-white"
                    placeholder="0.00 " disabled
                  />
                  <span className="text-gray-400">TCC</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="flex justify-center items-center min-h-[100px]">
                <button
                  onClick={handleStartTrade}
                  className="font-medium p-4 hover:text-yellow-500 transition-colors bg-yellow-800 text-white rounded-lg hover:bg-yellow-700 transform hover:scale-105 transition-transform duration-200"
                >
                  Start Champ trade
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[rgb(20,20,20)] rounded-xl p-3 sm:p-6 shadow-lg border border-yellow-500/20 mx-1 sm:mx-0">
        {/* Header with options dropdown */}
        <div className="flex justify-between items-start mb-2 sm:mb-4 relative">
          <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-1 sm:gap-2">
            <RefreshCw className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
            <span className="text-sm sm:text-base">Plan & Reinvestment</span>
          </h3>

          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1 text-yellow-500 hover:text-yellow-400 transition-colors text-xs sm:text-base"
            >
              Options
              {showDropdown ? (
                <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
              ) : (
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-1 sm:mt-2 w-40 sm:w-48 bg-[rgb(30,30,30)] rounded-lg shadow-lg border border-yellow-500/20 z-10">
                <div className="py-1">
                  <button className="block w-full text-left px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500">
                    Investment1
                  </button>
                  <button className="block w-full text-left px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500">
                    Investment2
                  </button>
                  <button className="block w-full text-left px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-500">
                    Investment3
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3 sm:space-y-6">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>${progress.toFixed(2)} / $100.00</span>
            </div>
            <div className="h-2 sm:h-4 bg-[rgb(20,20,20)] border border-yellow-500 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Time Remaining */}
          <div className="flex items-center gap-1 sm:gap-3 text-xs sm:text-base text-gray-300">
            <Clock className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500" />
            <span>{daysRemaining} days remaining</span>
          </div>

          {/* Milestones */}
          <div className="space-y-1 sm:space-y-3">
            <h4 className="text-white font-semibold text-xs sm:text-base">Milestones</h4>
            <div className="grid grid-cols-3 gap-1 sm:gap-4">
              <div className="text-center p-1 sm:p-2 bg-[rgb(20,20,20)] border border-yellow-500 rounded">
                <div className="text-yellow-500 font-bold text-xs sm:text-base">Year 1</div>
                <div className="text-[10px] sm:text-sm text-gray-400">$33.33</div>
              </div>
              <div className="text-center p-1 sm:p-2 bg-[rgb(20,20,20)] border border-yellow-500 rounded">
                <div className="text-yellow-500 font-bold text-xs sm:text-base">Year 2</div>
                <div className="text-[10px] sm:text-sm text-gray-400">$66.66</div>
              </div>
              <div className="text-center p-1 sm:p-2 bg-[rgb(20,20,20)] border border-yellow-500 rounded">
                <div className="text-yellow-500 font-bold text-xs sm:text-base">Year 3</div>
                <div className="text-[10px] sm:text-sm text-gray-400">$100.00</div>
              </div>
            </div>
          </div>

          {/* Auto-Reinvestment Note */}
          <div className="text-[10px] sm:text-sm text-gray-400 bg-[rgb(20,20,20)] border border-yellow-500 p-2 sm:p-4 rounded">
            <p>Auto-reinvestment at $100 reserve.</p>
          </div>
        </div>
      </div>

      <div className="space-y-6 max-w-6xl mx-auto mt-4">
        <p className='text-yellow-500 font-bold text-xl'>Purchase History</p>
        {/* New Transaction History Card with Responsive Table */}
        <div className="bg-[rgb(20,20,20)] rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <RefreshCw className="w-6 h-6 text-yellow-500" />
            Transaction History
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full divide-y divide-yellow-500/20">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10">
                {transactionHistory.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-yellow-500/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${transaction.status === 'Completed'
                        ? 'bg-green-900/50 text-green-400'
                        : 'bg-yellow-900/50 text-yellow-500'
                        }`}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {transactionHistory.map((transaction) => (
              <div key={transaction.id} className="bg-[rgb(30,30,30)] p-4 rounded-lg border border-yellow-500/20">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-yellow-500">ID</p>
                    <p className="text-sm text-white">{transaction.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Type</p>
                    <p className="text-sm text-white">{transaction.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Amount</p>
                    <p className="text-sm text-white">{transaction.amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Date</p>
                    <p className="text-sm text-white">{transaction.date}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-yellow-500">Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${transaction.status === 'Completed'
                    ? 'bg-green-900/50 text-green-400'
                    : 'bg-yellow-900/50 text-yellow-500'
                    }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanProgress;
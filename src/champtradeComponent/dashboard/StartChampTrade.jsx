import { useState } from 'react';
import { Clock, RefreshCw, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';
import { Coins, TrendingUp } from 'lucide-react';

const StartChampTrade = () => {
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
    </>
  );
};

export default StartChampTrade; 
import { useEffect, useState } from 'react';
import { Clock, RefreshCw, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';
import { useStore } from '../../Store/UserStore';
import Swal from 'sweetalert2';
import { useTransaction } from '../../config/register';

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



  // ================================================================
  // Individual Earning 
  // ================================================================

  const [selectedInvestmentId, setSelectedInvestmentId] = useState('');
  const [investments, setInvestments] = useState([]);

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;

  const getUserIndWdrDetails = useStore((state) => state.getUserIndWdrDetails);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!userAddress) return;
      const res = await getUserIndWdrDetails(userAddress);

      // Normalize data properly
      const normalized = res.map(item => ({
        investmentId: Number(item.investmentId),
        canClaimNow: item.canClaimNow,
        daysClaimed: Number(item.daysClaimed),
        daysRemainingInCycle: Number(item.daysRemainingInCycle),
        timeUntilClaim: item.timeUntilClaim,
        currentDayOfWeek: item.currentDayOfWeek
      }));

      setInvestments(normalized);

      if (normalized.length > 0) {
        setSelectedInvestmentId(normalized[0].investmentId);
      }
    };

    if (userAddress) fetchInvestments();

  }, [userAddress]);

  const selectedInvestment = investments.find(inv => inv.investmentId === selectedInvestmentId);

  function calculateRemainingDays(currentDayOfWeek) {
    return (7 - parseInt(currentDayOfWeek)) % 7;
  }


  // ================================================================
  // Claim Earning ROI
  // ================================================================

  function calculateRemainingDays(currentDayOfWeek) {
    return (7 - currentDayOfWeek) % 7;
  }

  const { handleSendTx, hash } = useTransaction()

  useEffect(() => {
    if (hash) {
      Swal.fire({
        title: "Transaction Success Full ",
        html: `<a href="https://testnet.bscscan.com/tx/${hash}" target="_blank" style="color:#3085d6;">View on BscScan</a>`,
        icon: 'success',
        confirmButtonText: 'Close'
      });

    }
  }, [hash]);

  const claimRoiIndividual = useStore((state) => state.claimRoiIndividual);


  const handleClaim = async () => {
    try {
      const response = await claimRoiIndividual(userAddress, selectedInvestmentId)

      if (response) {
        await handleSendTx(response);
      }
    } catch (error) {
      console.log(error)
    }
  }




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




      <div className="bg-[rgb(20,20,20)] rounded-xl p-3 sm:p-6 shadow-lg border border-yellow-500/20 mx-1 sm:mx-0">
        {/* Header with options dropdown */}
        <div className="flex justify-between items-start mb-2 sm:mb-4 relative">
          <h3 className="text-base sm:text-xl font-bold text-white flex items-center gap-1 sm:gap-2">
            <RefreshCw className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-500" />
            <span className="text-sm sm:text-base">portfolio Progress</span>
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

            <div className="mt-2">
              <select
                value={selectedInvestmentId}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  setSelectedInvestmentId(selectedId);
                }}
                className="w-full bg-[rgb(30,30,30)] border border-yellow-500/20 rounded-lg text-white p-2 text-sm"
              >
                <option value="" disabled>Select Investment</option>
                {investments.map((inv, idx) => (
                  <option key={idx} value={inv.investmentId}>
                    Investment {inv.investmentId}
                  </option>
                ))}
              </select>
            </div>


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
            {selectedInvestment && (
              <div className="space-y-3 sm:space-y-6">
                <div className="text-white p-4 border border-yellow-500/20 rounded-lg">
                  <p>Investment ID: {selectedInvestment.investmentId}</p>
                  <p>Days Claimed: {selectedInvestment.daysClaimed}</p>
                  <p>Days Remaining: {selectedInvestment.daysRemainingInCycle}</p>
                  <p>Next Claim In: {selectedInvestment.timeUntilClaim}</p>
                  <p>Can Claim Now: {selectedInvestment.canClaimNow ? "Yes" : "No"}</p>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span>{selectedInvestment.daysRemainingInCycle} days remaining</span>
                  <button
                    disabled={!selectedInvestment.canClaimNow}
                    onClick={() => {
                      if (selectedInvestment.canClaimNow) {

                        handleClaim()
                      }
                      else {
                        Swal.fire({
                          title: 'Auto close alert!',
                          text: 'I will close in 2 seconds.',
                          timer: 2000
                        })
                      }
                    }} className={`w-full md:w-[200px] ${selectedInvestment.canClaimNow && selectedInvestment.daysClaimed == 0 ? 'bg-yellow-600 hover:bg-yellow-500' : ''} text-white font-bold py-3 px-6 rounded-lg  transition-colors border border-yellow-500 `}>
                    {selectedInvestment.canClaimNow && selectedInvestment.daysClaimed == 0 ? "Claim"
                      : selectedInvestment.daysClaimed !== 0 ? "Withdrawn"
                        : `Claim in (${selectedInvestment.timeUntilClaim})`}

                  </button>
                </div>
              </div>
            )}
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
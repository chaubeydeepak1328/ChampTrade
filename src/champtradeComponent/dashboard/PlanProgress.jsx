import { useEffect, useMemo, useState } from 'react';
import { Clock, RefreshCw, ChevronDown, ChevronUp, X, CheckCircle } from 'lucide-react';
import { useStore } from '../../Store/UserStore';
import Swal from 'sweetalert2';
import { useTransaction } from '../../config/register';
import Lottie from 'react-lottie';
import coinAnimaton from '../../utils/CoinAnimation.json'
import { useAppKitAccount } from '@reown/appkit/react';

const PlanProgress = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const { address, isConnected } = useAppKitAccount();

  const userData = JSON.parse(localStorage.getItem("userData") || "null");
  const userAddress = userData?.userAddress || null;


  // ================================================================
  // Individual Earning 
  // ================================================================

  const [selectedInvestmentId, setSelectedInvestmentId] = useState('');
  const [investments, setInvestments] = useState([]);

  const [claimHistory, setClaimHistory] = useState([]);






  const getUserIndWdrDetails = useStore((state) => state.getUserIndWdrDetails);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!userAddress) return;
      const res = await getUserIndWdrDetails(userAddress);

      // Normalize data properly
      const normalized = res.invetmentData?.map(item => ({
        investmentId: Number(item.investmentId),
        canClaimNow: item.canClaimNow,
        daysClaimed: Number(item.daysClaimed),
        daysRemainingInCycle: Number(item.daysRemainingInCycle),
        timeUntilClaim: item.timeUntilClaim,
        currentDayOfWeek: item.currentDayOfWeek,
        unClaimedAmt: Number(item.UnClaimedWeekRoi.totalUnclaimedAmount)
      }));

      setInvestments(normalized);



      console.log("res.claimInvestment", res.claimInvestment)
      setClaimHistory(...res.claimInvestment)

      if (normalized?.length > 0) {
        setSelectedInvestmentId(normalized[0].investmentId);
      }
    };

    if (userAddress) fetchInvestments();

  }, [userAddress]);

  const selectedInvestment = investments?.find(inv => inv.investmentId === selectedInvestmentId);


  // ================================================================
  // Claim Earning ROI
  // ================================================================


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

    if (address && isConnected && (address == userAddress)) {
      try {
        const response = await claimRoiIndividual(userAddress, selectedInvestmentId)

        if (response) {
          await handleSendTx(response);
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      Swal.fire("Warning", "Connect your wallet first", "warning");
    }

  }



  // ================================================================
  //userInvestmentWithDetails
  // ================================================================

  const userInvestmentWithDetails = useStore((state) => state.userInvestmentWithDetails)

  const [userInvDet, setUserInvDet] = useState([]);


  useEffect(() => {
    const getchInvDet = async () => {
      try {

        const response = await userInvestmentWithDetails(userAddress);
        console.log("Raw Response", response);

        // parse each investment tuple
        const parsed = response.map((inv) => ({
          investmentID: Number(inv.investmentID),
          tccPriceDuringInvestment: Number(inv.tccPriceDuringInvestment) / 1e8,
          investedAmountInUSD: Number(inv.investedAmountInUSD) / 1e8,
          investedAmountInTCC: Number(inv.investedAmountInTCC) / 1e8,
          developerFeeTCC: Number(inv.developerFeeTCC) / 1e18,
          principalInUSD: Number(inv.principalInUSD) / 1e8,
          principalInTCC: Number(inv.principalInTCC) / 1e18,
          totalROIReceived: Number(inv.totalROIReceived) / 1e18,

          // ✅ Fixed BigInt-safe conversion
          totalAccumulatedAmountForInvestment: Number(BigInt(inv.totalAccumulatedAmountForInvestment)) / 1e18,

          startDay: new Date(Number(inv.startDay) * 86400 * 1000).toLocaleString(),
          roiDaysClaimed: Number(inv.roiDaysClaimed),

          lastInvestmentTimestamp: new Date(Number(inv.lastInvestmentTimestamp) * 1000).toLocaleString(),
          lastReinvestmentDay: new Date(Number(inv.lastReinvestmentDay) * 86400 * 1000).toLocaleString(),
          lastClaimDay: new Date(Number(inv.lastClaimDay) * 86400 * 1000).toLocaleString(),
          lastLevelCapResetDay: new Date(Number(inv.lastLevelCapResetDay) * 86400 * 1000).toLocaleString(),

          isCompleted: inv.isCompleted,
          claimCount: Number(inv.claimCount),

          claimedROIs: inv.claimedROIs.map((roi) => ({
            day: Number(roi.day),
            amountUsd: Number(roi.amountUsd) / 1e8,
            amountTcc: Number(roi.amountTcc) / 1e18,
            claimedAt: new Date(Number(roi.claimedAt) * 1000).toLocaleString(),
          })),

          remainingDays: Number(inv.remainingDays),
          dailyROIUsd: Number(inv.dailyROIUsd) / 1e8,
          dailyROITcc: Number(inv.dailyROITcc) / 1e18,
          totalExpectedROIUsd: Number(inv.totalExpectedROIUsd) / 1e8,
          totalExpectedROITcc: Number(inv.totalExpectedROITcc) / 1e18,
        }));


        console.log("Parsed InvestmentView:", parsed);
        setUserInvDet(parsed);
      } catch (err) {
        console.error("Error loading investment view", err);
      }
    };

    if (userAddress) getchInvDet();
  }, [userAddress]);


  const TOTAL_DAYS = 940;

  // const claimedDays = TOTAL_DAYS - selectedInvestment?.daysRemainingInCycle || 0;
  // const progress = (claimedDays / TOTAL_DAYS) * 100;

  const claimedDays = useMemo(() => {
    return selectedInvestment ? TOTAL_DAYS - selectedInvestment.daysRemainingInCycle : 0;
  }, [selectedInvestment]);

  const progress = useMemo(() => {
    return (claimedDays / TOTAL_DAYS) * 100;
  }, [claimedDays]);


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: coinAnimaton,  // <-- REQUIRED
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
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
            <span className="text-sm sm:text-base">Portfolio Progress</span>
          </h3>

          <div className="relative">


            <div className="mt-2">
              <select
                value={selectedInvestmentId}
                onChange={(e) => {
                  const selectedId = parseInt(e.target.value);
                  setSelectedInvestmentId(selectedId);
                }}
                className="w-full bg-[rgb(30,30,30)] border border-yellow-500/20 rounded-lg text-white p-2 text-sm"
              >
                <option value="" disabled>Select Portfolio</option>
                {investments?.map((inv, idx) => (
                  <option key={idx} value={inv.investmentId}>
                    Portfolio {inv.investmentId}
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
              <span>{claimedDays} / {TOTAL_DAYS} days</span>


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
            <span>
              {selectedInvestment
                ? `${selectedInvestment.daysRemainingInCycle} days remaining`
                : "Loading..."}
            </span>

          </div>



          {/* Auto-Reinvestment Note */}
          <div className="text-[10px] sm:text-sm text-gray-400 bg-[rgb(20,20,20)] border border-yellow-500 p-2 sm:p-4 rounded">
            {selectedInvestment && (
              <div className="space-y-3 sm:space-y-6">
                <div className="flex  text-white p-4 border border-yellow-500/20 rounded-lg">
                  <div className='w-[50%]'>
                    <button className='bg-green-800 rounded p-1'>Un Claim: {(parseFloat(selectedInvestment.unClaimedAmt) / 1e18).toFixed(4)}</button>
                    <p>Investment ID: {selectedInvestment.investmentId}</p>
                    <p>Days Claimed: {selectedInvestment.daysClaimed}</p>
                    <p>Days Remaining: {selectedInvestment.daysRemainingInCycle}</p>
                    <p>Next Claim In: {selectedInvestment.timeUntilClaim}</p>
                    <p>Can Claim Now: {selectedInvestment.canClaimNow ? "Yes" : "No"}</p>
                  </div>

                  <div className="flex w-[50%] ">

                    <Lottie options={defaultOptions} height={200} width={200} />
                  </div>


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



      {/* ================================================================================== */}
      {/* Purchase History */}
      {/* ================================================================================== */}

      <div className="space-y-6  mx-auto mt-4">
        <p className='text-yellow-500 font-bold text-xl'>Purchase History</p>
        {/* New Transaction History Card with Responsive Table */}
        <div className="bg-[rgb(20,20,20)] rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <RefreshCw className="w-6 h-6 text-yellow-500" />
            Investment Details
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-yellow-500/20">
            <table className="min-w-[1600px] divide-y divide-yellow-500/20">
              <thead className="bg-[rgb(25,25,25)]">
                <tr>
                  {/* <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">S. No</th> */}
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Investment ID</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Price During investment</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Invested (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Invested (TCC)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Development Fee</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Principal (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Principal (TCC)</th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">ROI Received</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Accumulated Total</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Start Day</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">ROI Days</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Cap Reset Day</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claim Count</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Last Invest</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Last Reinvest</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Last Claim</th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Roi Reveived</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Days Claimed</th>

                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Remaining Days</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Daily ROI (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Daily ROI (TCC)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Expected ROI (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Expected ROI (TCC)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10 bg-[rgb(15,15,15)]">
                {userInvDet.length > 0 && userInvDet ? (
                  userInvDet?.map((inv, index) => (
                    <tr key={inv.investmentID || index} className="hover:bg-yellow-500/5">
                      {/* <td className="px-4 py-3 text-sm text-white">{index + 1}</td> */}
                      <td className="px-4 py-3 text-sm text-white">{inv.investmentID}</td>
                      <td className="px-4 py-3 text-sm text-white">${(inv.tccPriceDuringInvestment).toFixed(4)}</td>
                      <td className="px-4 py-3 text-sm text-white">${(inv.investedAmountInUSD).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white">   {(parseFloat(inv.principalInTCC) + parseFloat(inv.developerFeeTCC)).toFixed(4)} TCC</td>
                      <td className="px-4 py-3 text-sm text-white">{(inv.developerFeeTCC).toFixed(4)} TCC</td>
                      <td className="px-4 py-3 text-sm text-white">${(inv.principalInUSD).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white">{(inv.principalInTCC).toFixed(4)} TCC</td>

                      <td className="px-4 py-3 text-sm text-white">
                        ${inv.totalROIReceived.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        ${inv.totalAccumulatedAmountForInvestment.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.startDay}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.roiDaysClaimed}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.lastLevelCapResetDay}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.claimCount}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.lastInvestmentTimestamp}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.lastReinvestmentDay}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.lastClaimDay}
                      </td>




                      <td className="px-4 py-3 text-sm text-white">${(inv.totalROIReceived).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white">{inv.roiDaysClaimed}</td>
                      <td className="px-4 py-3 text-sm text-white">{inv.remainingDays}</td>
                      <td className="px-4 py-3 text-sm text-white">${(inv.dailyROIUsd).toFixed(4)}</td>
                      <td className="px-4 py-3 text-sm text-white">{(inv.dailyROITcc).toFixed(4)} TCC</td>
                      <td className="px-4 py-3 text-sm text-white">${(inv.totalExpectedROIUsd).toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-white">{(inv.totalExpectedROITcc).toFixed(4)} TCC</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={`px-2 py-1 text-xs rounded-full ${inv.isCompleted ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-500'}`}>
                          {inv.isCompleted ? 'Completed' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-4">No data found</td>
                  </tr>

                )}
              </tbody>
            </table>
          </div>


          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {userInvDet?.map((inv, index) => (
              <div key={inv.investmentID || index} className="bg-[rgb(30,30,30)] p-4 rounded-lg border border-yellow-500/20">
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-yellow-500">Investment ID</p>
                    <p className="text-sm text-white">{inv.investmentID}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">TCC Price (at time)</p>
                    <p className="text-sm text-white">${(inv.tccPriceDuringInvestment).toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Invested USD</p>
                    <p className="text-sm text-white">${(inv.investedAmountInUSD).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Invested TCC</p>
                    <p className="text-sm text-white">
                      {(parseFloat(inv.principalInTCC) + parseFloat(inv.developerFeeTCC)).toFixed(4)} TCC
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Development Fee (TCC)</p>
                    <p className="text-sm text-white">{(inv.developerFeeTCC).toFixed(4)} TCC</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Principal USD</p>
                    <p className="text-sm text-white">${(inv.principalInUSD).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Principal TCC</p>
                    <p className="text-sm text-white">{(inv.principalInTCC).toFixed(4)} TCC</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">ROI Received</p>
                    <p className="text-sm text-white">${(inv.totalROIReceived).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Accumulated Total</p>
                    <p className="text-sm text-white">${(inv.totalAccumulatedAmountForInvestment).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Start Day</p>
                    <p className="text-sm text-white">{inv.startDay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">ROI Days Claimed</p>
                    <p className="text-sm text-white">{inv.roiDaysClaimed}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Last Invested (timestamp)</p>
                    <p className="text-sm text-white">{inv.lastInvestmentTimestamp}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Last Reinvest Day</p>
                    <p className="text-sm text-white">{inv.lastReinvestmentDay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Last Claim Day</p>
                    <p className="text-sm text-white">{inv.lastClaimDay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Cap Reset Day</p>
                    <p className="text-sm text-white">{inv.lastLevelCapResetDay}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Completed</p>
                    <p className="text-sm text-white">{inv.isCompleted ? "Yes" : "No"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claim Count</p>
                    <p className="text-sm text-white">{inv.claimCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Remaining Days</p>
                    <p className="text-sm text-white">{inv.remainingDays}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Daily ROI (USD)</p>
                    <p className="text-sm text-white">${(inv.dailyROIUsd).toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Daily ROI (TCC)</p>
                    <p className="text-sm text-white">{(inv.dailyROITcc).toFixed(4)} TCC</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Total Expected ROI (USD)</p>
                    <p className="text-sm text-white">${(inv.totalExpectedROIUsd).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Total Expected ROI (TCC)</p>
                    <p className="text-sm text-white">{(inv.totalExpectedROITcc).toFixed(4)} TCC</p>
                  </div>
                </div>

                {/* Optional Status */}
                <div className="mt-3">
                  <p className="text-xs text-yellow-500">Status</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${inv.isCompleted ? "bg-green-900/50 text-green-400" : "bg-yellow-900/50 text-yellow-500"
                      }`}
                  >
                    {inv.isCompleted ? "Completed" : "Active"}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>



      {/* ================================================================================== */}
      {/* Claim History */}
      {/* ================================================================================== */}

      <div className="space-y-6 mx-auto mt-4">
        <p className="text-yellow-500 font-bold text-xl">Claim History</p>

        <div className="bg-[rgb(20,20,20)] rounded-xl p-6 border border-yellow-500/20">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <RefreshCw className="w-6 h-6 text-yellow-500" />
            Investment Claim Details
          </h3>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto rounded-lg border border-yellow-500/20">
            <table className="min-w-[1600px] divide-y divide-yellow-500/20">
              <thead className="bg-[rgb(25,25,25)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">S. No</th>
                  {/* <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Investment ID</th> */}
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed (USD)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed (TCC)</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-yellow-500 uppercase">Claimed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10 bg-[rgb(15,15,15)]">
                {claimHistory && claimHistory.length > 0 ? (
                  claimHistory.map((inv, index) => (
                    <tr key={inv.id || index} className="hover:bg-yellow-500/5">
                      <td className="px-4 py-3 text-sm text-white">{index + 1}</td>
                      {/* <td className="px-4 py-3 text-sm text-white">{inv.id.toString()}</td> */}
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.amountInUSD ? `$${(Number(inv.amountInUSD) / 1e8).toFixed(4)}` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.amountInTCC ? `${((Number(inv.amountInTCC) * 4) / 1e18).toFixed(2)} TCC` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.roiDaysClaimed ? `${Number(inv.roiDaysClaimed).toFixed(0)} Days` : 'N/A'}
                      </td>
                      <td className="px-4 py-3 text-sm text-white">
                        {inv.claimedAt ? new Date(Number(inv.claimedAt) * 1000).toLocaleString() : 'N/A'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-gray-400 py-4">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {claimHistory?.map((inv, index) => (
              <div key={inv.id || index} className="bg-[rgb(30,30,30)] p-4 rounded-lg border border-yellow-500/20">
                <div className="grid grid-cols-2 gap-4">
                  {/* <div>
                    <p className="text-xs text-yellow-500">Investment ID</p>
                    <p className="text-sm text-white">{inv.id.toString()}</p>
                  </div> */}
                  <div>
                    <p className="text-xs text-yellow-500">Claimed (TCC)</p>
                    <p className="text-sm text-white">
                      {inv.amountInTCC ? `${((Number(inv.amountInTCC) * 4) / 1e18).toFixed(2)} TCC` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed (USD)</p>
                    <p className="text-sm text-white">
                      {inv.amountInUSD ? `$${(Number(inv.amountInUSD) / 1e8).toFixed(2)}` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed</p>
                    <p className="text-sm text-white">
                      {inv.roiDaysClaimed ? `${Number(inv.roiDaysClaimed).toFixed(0)} Days` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-yellow-500">Claimed At</p>
                    <p className="text-sm text-white">
                      {inv.claimedAt ? new Date(Number(inv.claimedAt) * 1000).toLocaleString() : 'N/A'}
                    </p>
                  </div>
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